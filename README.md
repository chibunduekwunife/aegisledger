
# AegisLedger 💸

**AI-Powered Finance Tracker** | *Take control of your money with voice-driven AI insights*

---

## Features ✨

- **AI Transaction Logging**:  
  ➡️ *"I spent $20 on coffee yesterday"* → Auto-categorizes and logs transactions.  
  ➡️ **Voice-to-Text**: Speak transactions via OpenAI Whisper integration.
- **Manual Logging**: Add transactions with amount, category, date, and notes.
- **Real-Time Dashboard**:  
  📊 Spending trends, category breakdowns, and budget progress.  
  🔔 Alerts when nearing budget limits.
- **Export Data**: Download CSV/PDF reports.
- **Secure**: JWT authentication, encrypted API keys.

---

## Tech Stack 🛠️

| **Frontend**       | **Backend**          | **AI/APIs**               | **Database**      | **Tools**         |
|--------------------|----------------------|---------------------------|-------------------|-------------------|
| Next.js 14         | Django 4.2           | OpenAI GPT-4/Whisper      | PostgreSQL        | Docker            |
| TypeScript         | Django REST Framework| OpenWeatherMap (optional) |                   | Tailwind CSS      |
| Chart.js           | Celery (async tasks) |                           |                   | Vercel/Heroku     |

---

## Getting Started 🚀

### Prerequisites
- Node.js 18+, Python 3.10+
- OpenAI API key ([Get here](https://platform.openai.com/))
- PostgreSQL

### Installation

1. **Clone the monorepo**:
   ```bash
   git clone https://github.com/yourusername/aegisledger.git
   cd aegisledger
   ```

2. **Set up backend**:
   ```bash
   cd apps/backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Set up frontend**:
   ```bash
   cd apps/frontend
   npm install
   ```

4. **Environment variables**:
   - Backend (`.env`):
     ```
     OPENAI_API_KEY=your_key_here
     DATABASE_URL=postgres://user:pass@localhost:5432/aegisledger
     ```
   - Frontend (`.env.local`):
     ```
     NEXT_PUBLIC_API_URL=http://localhost:8000
     ```

5. **Run locally**:
   - Backend: `python manage.py runserver`
   - Frontend: `npm run dev`

---

## Usage Examples 💬

1. **AI Logging**:  
   *Type or say*:  
   *"Paid $150 for electricity today"*  
   → Logs $150 under *Utilities* for today.

2. **Budget Tracking**:  
   Set a $500/month Food budget → Get alerts at 80% ($400) and 100%.

---

## API Reference 🌐

| Endpoint             | Method | Description                     |
|----------------------|--------|---------------------------------|
| `/api/transactions/` | POST   | Log a transaction (AI/manual)  |
| `/api/budgets/`      | GET    | Fetch budget progress          |
| `/api/ai/process/`   | POST   | Parse natural language input    |

**Sample Request**:
```bash
curl -X POST http://localhost:8000/api/ai/process/ \
  -H "Content-Type: application/json" \
  -d '{"input": "I spent $30 on groceries today"}'
```

---

## Contributing 🤝

1. Fork the repo.
2. Create a branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add awesome feature'`.
4. Push to branch: `git push origin feature/your-feature`.
5. Open a PR!

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## Building in Public 🚀

Follow my journey on [Twitter](https://twitter.com/YourHandle) and [LinkedIn](https://linkedin.com/in/YourProfile)!  

**Recent Updates**:  
- **[MM/DD/YY]**: Launched AI voice logging! 🎙️  
- **[MM/DD/YY]**: Hit 100 stars on GitHub! 🌟  

**Example Post**:  
*"Day 14: Just added budget alerts! Learned the hard way about timezones in Django 😅 #BuildInPublic #IndieHackers"*

---

## License 📜

MIT License. See [LICENSE](LICENSE).

---

## Acknowledgments 🙌

- Inspired by [YouTube Tutorial](https://www.youtube.com/watch?v=Dn1EjhcQk64).
- OpenAI for their amazing API.
- The Tailwind CSS community for UI magic.

---

Built with ❤️ by [Your Name](https://github.com/yourusername).  
**Let’s make finance tracking effortless!** 💰
```

---

### **Key Sections Explained**
1. **Visual Appeal**: Icons, tables, and placeholders for media.
2. **Social Proof**: "Building in Public" section for transparency.
3. **Dev-Friendly**: Clear setup steps, API examples, and contribution guide.
4. **SEO-Ready**: Keywords like "AI finance tracker" and "voice logging".

**Next Steps**:  
- Replace placeholders (demo media, social links).  
- Add a `CONTRIBUTING.md` for PR guidelines.  
- Update the "Recent Updates" as you build!
