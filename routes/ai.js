const express = require('express');
const axios = require('axios');
const Book = require('../models/book');

const router = express.Router();

const GEMINI_API_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;


router.post('/book-recommendation', async (req, res) => {
  try {
    const { message } = req.body;


    const allBooks = await Book.find({}).select('title author desc genre price -_id');

    if (allBooks.length === 0) {
      return res.json({
        reply: "I'm sorry, but our bookstore is currently empty. Please check back later!"
      });
    }

    const bookContext = allBooks.map((book, index) => 
      `Book ${index + 1}: "${book.title}" by ${book.author}. ${book.desc.substring(0, 150)}... Genre: ${book.genre || 'General'}. Price: ৳${book.price}`
    ).join('\n\n');


    


    const prompt = `
You are BookGenius, an AI assistant for an online bookstore. Your task is to recommend books ONLY from the provided inventory.

**INVENTORY (ONLY RECOMMEND THESE BOOKS):**
${bookContext}

**USER QUERY:** "${message}"

**GUIDELINES:**
1. ONLY recommend books from the inventory above
2. Recommend 1-3 books that best match the query
3. For each book, mention: Title, Author, Price, and why it matches
4. If no books match exactly, suggest the closest alternatives
5. Be friendly, conversational, and helpful
6. Never invent books not in the inventory
7. Format recommendations clearly with bullet points
8. If asking for clarification, keep it brief
9. Always respond in a natural, conversational tone

**RESPONSE:`;

    // Debug: Check if API key is loaded
    //console.log('Gemini API Key present:', !!process.env.GEMINI_API_KEY);

    const response = await axios.post(GEMINI_API_URL, {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        
      }
    });

    const aiResponse = response.data.candidates[0].content.parts[0].text;

    res.json({ reply: aiResponse });

  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    console.error('Error details:', error.response?.status, error.response?.statusText);

    if (error.response?.data?.error?.message?.includes('API key')) {
      return res.status(500).json({
        error: "API configuration error. Please contact support."
      });
    }

    if (error.response?.status === 429) {
      return res.status(500).json({
        error: "I'm getting too many requests right now. Please try again in a moment."
      });
    }

    res.status(500).json({
      error: "I apologize, but I'm having trouble accessing our book database right now. Please try again later or browse our books manually."
    });
  }
});

// additional endpoint for simple chat 
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(GEMINI_API_URL, {
      contents: [
        {
          parts: [
            {
              text: message
            }
          ]
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        
      }
    });

    const aiResponse = response.data.candidates[0].content.parts[0].text;
    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Gemini Chat Error:', error);
    res.status(500).json({ error: "Sorry, I'm having trouble responding right now." });
  }
});

module.exports = router;