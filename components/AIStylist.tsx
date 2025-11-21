import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Loader2, Sparkles, X } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateStylistResponse } from '../services/geminiService';

const AIStylist: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Welcome to the Private Concierge. I am Kingsley, your personal stylist. How may I assist you with your wardrobe today? You can show me an outfit or ask for advice."
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async () => {
    if ((!inputText.trim() && !selectedImage) || isLoading) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      image: selectedImage || undefined
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    const tempImage = selectedImage; // Store to pass to API
    setSelectedImage(null); // Clear preview
    setIsLoading(true);

    try {
      const responseText = await generateStylistResponse(messages, newMessage.text, tempImage || undefined);
      
      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, responseMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I apologize, but I am unable to process your request at the moment.",
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 p-6 text-center">
        <div className="flex justify-center items-center mb-2">
          <Sparkles className="w-6 h-6 text-gold-600 mr-2" />
          <h2 className="text-2xl font-serif font-bold text-stone-900">Kingsley Concierge</h2>
        </div>
        <p className="text-stone-500 text-sm">Powered by Gemini 2.5 Flash</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-6 py-4 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-stone-900 text-white rounded-br-none'
                  : 'bg-white text-stone-800 border border-stone-100 rounded-bl-none'
              }`}
            >
              {msg.image && (
                <img 
                  src={msg.image} 
                  alt="User upload" 
                  className="mb-4 rounded-lg max-h-60 object-cover w-full"
                />
              )}
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-none px-6 py-4 border border-stone-100 shadow-sm flex items-center space-x-2">
              <Loader2 className="w-5 h-5 text-gold-600 animate-spin" />
              <span className="text-stone-400 italic">Curating response...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-stone-200 p-4">
        <div className="max-w-4xl mx-auto">
          {selectedImage && (
            <div className="mb-4 relative inline-block">
              <img 
                src={selectedImage} 
                alt="Preview" 
                className="h-24 w-24 object-cover rounded-lg border border-gold-400"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <div className="flex items-end space-x-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-stone-500 hover:text-gold-600 hover:bg-stone-50 rounded-full transition-colors"
              title="Upload an outfit photo"
            >
              <ImageIcon className="w-6 h-6" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            <div className="flex-1 bg-stone-100 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-gold-400 transition-all">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Kingsley for style advice..."
                className="w-full bg-transparent border-none focus:ring-0 resize-none p-2 text-stone-800 placeholder-stone-400 max-h-32"
                rows={1}
                style={{ minHeight: '44px' }}
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={isLoading || (!inputText.trim() && !selectedImage)}
              className={`p-3 rounded-full transition-all duration-200 ${
                isLoading || (!inputText.trim() && !selectedImage)
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-gold-600 text-white hover:bg-gold-500 shadow-md'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStylist;
