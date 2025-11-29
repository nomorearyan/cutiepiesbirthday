# 🌸 Long-Distance Relationship Journey Website

A beautiful, interactive website celebrating your long-distance love story with all the features you need to keep your connection strong across the miles.

## ✨ Features Included

### 🌍 Core LDR Features
- **Live Timezone Display** - See both your times in real-time
- **Countdown Timer** - Days/hours/minutes until you meet next
- **Distance Tracker** - Shows the km between you (customizable)
- **LDR Map Animation** - Heart traveling between your cities

### 💌 Interactive Elements
- **Open When Letters** (8 letters):
  - Open When You Miss Me
  - Open When You're Sad
  - Open When You're Happy
  - Open When You Can't Sleep
  - Open When You Feel Lonely
  - Open When I'm Proud of You
  - Open On Your Birthday
  - Open Anytime

- **Love Features**:
  - Why I Choose You Every Day
  - Spin the Love Wheel (random messages)
  - Love Quiz Game
  - Our Aesthetic Moodboard
  - Next Trip Plans
  - Shared Playlist
  - Dream Home Board
  - Promise Wall (add promises)

### 📸 Memory Sections
- Video Call Moments
- Voice Notes Collection
- Chat Screenshots
- Late Night Talks
- Surprise Deliveries
- In-Person Memories

### 🎨 Visual Effects
- Sparkles animation
- Floating hearts
- Confetti celebrations
- Smooth scroll animations
- Interactive modals
- Surprise popup messages
- Floating action button

### 📱 Timeline Features
- Filterable milestones (Month 1, 6 months, 1 year)
- Our First Call
- Our First Photo Together
- The Day I Knew I Loved You
- First Video Call Marathon
- When We Finally Met

## 🚀 Quick Start

1. **Customize Your Details** in `script.js`:
```javascript
// Line 18-19: Change timezones
const timezone1 = 'Asia/Kolkata';  // Your timezone
const timezone2 = 'America/New_York';  // Their timezone

// Line 43: Set next meeting date
const nextMeetDate = new Date('2025-12-31T00:00:00');

// Line 52: Set distance between you
document.getElementById('distance').textContent = '500'; // km
```

2. **Add Your Photos**:
   - `images/timeline/` - Timeline milestone photos
   - `images/memories/` - Memory section photos
   - `images/gallery/` - Main gallery photos

3. **Personalize Content** in `index.html`:
   - Update dates in timeline section
   - Change city names in hero section
   - Customize the love letter
   - Add your name in signature

4. **Open `index.html`** in your browser!

## 📂 File Structure

```
birthday-journey/
├── index.html          # Main HTML (all sections)
├── styles.css          # Complete styling + animations
├── script.js           # All interactive features
├── README.md          # This file
├── BACKEND-SETUP.md   # Backend instructions (optional)
└── images/
    ├── timeline/      # Timeline photos
    ├── memories/      # Memory section photos
    └── gallery/       # Gallery photos
```

## 🎨 Customization Guide

### Colors (in `styles.css`)
```css
Primary Pink: #ff6ba8
Light Pink: #ffb3de
Accent: #ffd6eb
Text: #8d5a73
```

### Adding More "Open When" Letters
Edit the `letters` object in `script.js` (line 338):
```javascript
'your-key': {
    title: 'Your Title',
    content: `Your letter content...`
}
```

### Adding Quiz Questions
Edit `questions` array in `script.js` (line 195):
```javascript
{
    question: "Your question?",
    options: ["A", "B", "C", "D"],
    correct: 0  // index of correct answer
}
```

### Adding Reasons You Love Them
Edit `reasons` array in `script.js` (line 96 and 508):
```javascript
"Your new reason here",
```

## 🌟 Interactive Features Explained

### Timeline Filtering
Click milestone buttons to filter timeline by:
- All Moments
- Month 1
- 6 Months  
- 1 Year

### Love Wheel
Click "Spin the Love Wheel" → Random sweet message with confetti!

### Promise Wall
Click "Add a Promise" to add new promises dynamically

### Floating Action Button (💝)
Bottom right corner → Click for random surprise messages!

### What I Miss Today
Click "Generate What I Miss" for random missing messages

## 📱 Responsive Design
Fully responsive for:
- Desktop (1920px+)
- Tablet (768px - 1920px)
- Mobile (< 768px)

## 🔧 Browser Compatibility
- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅

## 💝 Usage Tips

1. **First Time Setup**: Spend 30 minutes customizing all details
2. **Photo Quality**: Use high-resolution photos (1920x1080 or better)
3. **Letter Content**: Write genuine, heartfelt letters - they're the most special part!
4. **Quiz Questions**: Make them personal and fun (inside jokes work great!)
5. **Update Regularly**: Add new memories, promises, and photos over time

## 🎁 Special Occasions

### For Birthdays
- Use the "Open On Your Birthday" letter
- Update hero message
- Add birthday-themed photos

### For Anniversaries
- Update timeline with new milestones
- Add anniversary photos to gallery
- Create new "Open When" letter

## 🐛 Troubleshooting

**Timezone not updating?**
- Check timezone string format (e.g., 'Asia/Kolkata')
- Ensure JavaScript is enabled

**Countdown not working?**
- Verify date format: `new Date('YYYY-MM-DDTHH:MM:SS')`
- Check if date is in the future

**Photos not showing?**
- Check file paths are correct
- Ensure images are in the right folders
- Verify image file extensions (.jpg, .png)

---

## 📝 Customization Checklist

Before sharing with your partner:

- [ ] Update timezones in script.js
- [ ] Set next meeting date
- [ ] Set distance between cities
- [ ] Add all timeline photos
- [ ] Add memory section photos
- [ ] Add gallery photos
- [ ] Customize all "Open When" letters
- [ ] Update love letter content
- [ ] Add your name in signature
- [ ] Set quiz questions with real answers
- [ ] Add reasons you love them
- [ ] Customize trip plans
- [ ] Add song playlist
- [ ] Update dream home features
- [ ] Change city names in hero
- [ ] Update timeline dates

## 💕 Made with Love

For long-distance couples everywhere 🌍❤️

**Remember**: The best websites come from the heart. Customize every detail to make it uniquely yours! 💝
