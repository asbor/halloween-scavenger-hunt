# 🎃 Halloween Scavenger Hunt Cards

A fun, interactive Halloween scavenger hunt card generator perfect for creating spooky adventures at home!

## Features

- **Interactive Web Interface**: View and manage scavenger hunt cards in your browser
- **Print-Ready Cards**: Professional print layout for physical cards
- **Customizable Clues**: Easy-to-edit JSON format for adding your own riddles
- **Two Card Modes**: Swap between quiz-style riddles and challenge-based task cards with built-in scoring
- **Shuffling**: Randomize card order for different experiences
- **Answer Reveal**: Click to show/hide answers during the hunt
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Getting Started

### Quick Start
1. Open `index.html` in your web browser
2. Pick your preferred **card type** (Quiz riddles or Task challenges) and languages from the control panel
3. Use the controls to shuffle cards, print them, or reset the hunt
4. Click on answer areas to reveal solutions

### Printing Cards
1. Click the "🖨️ Print Cards" button
2. Your browser's print dialog will open
3. Cards are automatically formatted for printing (2 per page)
4. Print on cardstock for best results

## File Structure

```
halloween-scavenger-hunt/
├── index.html          # Main web interface
├── styles.css          # Styling and print layouts
├── script.js           # Interactive functionality
├── languages.json      # Localized clues, tasks, UI copy, and setup guide
├── clues.json          # Legacy clue data (kept for backwards compatibility)
├── docs/               # Project review and additional documentation
├── test-functionality.md # Manual testing checklist
└── README.md           # This file
```

## Customizing Your Hunt

### Adding New Clues

Edit `clues.json` to add your own riddles:

```json
{
    "id": 13,
    "emoji": "🕷️",
    "clue": "Your custom riddle here",
    "answer": "The solution",
    "location": "room_name"
}
```

### Card Properties

- **id**: Unique identifier for the clue
- **emoji**: Fun emoji to display on the card
- **clue**: The riddle text participants need to solve
- **answer**: Where the next clue is hidden
- **location**: General area category (for organization)

### Working with Card Types

- **Quiz Cards (default)** display the clue text and let players click to reveal the answer. This is perfect for classic riddle-based hunts.
- **Task Cards** swap riddles for activity prompts and show a point value instead of an answer. Use these for team challenges or competitive scoring.
- Switching the **Card Type** selector automatically updates both the on-screen grid and the print layout. Points defined in `languages.json` appear on every task card, including bilingual versions.

### Styling

Modify `styles.css` to change:
- Colors and themes
- Card sizes and layouts
- Print formatting
- Animations and effects

## Browser Features

### Interactive Controls
- **🔀 Shuffle Cards**: Randomize the order of clues
- **🖨️ Print Cards**: Generate print-ready versions
- **🔄 Reset Hunt**: Clear all revealed answers

### Special Features
- **Click to Reveal**: Tap answer areas to show solutions
- **Responsive Design**: Adapts to different screen sizes
- **Print Optimization**: Special layout for physical cards
- **Easter Eggs**: Hidden surprises for extra fun! 👻

## 🎯 How to Set Up the Hunt

### Step-by-Step Setup Instructions

1. **Print the Cards** 
   - Open `index.html` in your browser
   - Click "🖨️ Print Cards" to get physical copies
   - Print on cardstock for durability

2. **Hide Cards in Reverse Order**
   - **Start with Card 2**: Hide it where kids get snacks (kitchen/pantry)
   - **Card 3**: Hide under the dinner table
   - **Continue in sequence**: Each card goes where the previous clue's answer points
   - **Work backwards** until you've hidden all cards except Card 1

3. **Choose a Card Style for the Hunt**
   - Decide whether the adventure uses **Quiz cards** (clues with answers) or **Task cards** (challenges with points)
   - Mix and match: print a set of each card type or pair quiz cards with task cards for bonus rounds
   - Note the point values on task cards to plan your scoring or rewards

4. **Set Up the Final Prize**
   - Hide the ultimate treasure at the front door (or just outside)
   - Make it special - candy bag, small toy, or Halloween treat

5. **Optional: Extend the Hunt**
   - Add extra custom cards before the final clue
   - Use our 22 cards to create a longer adventure
   - Mix and match difficulty levels

6. **Start the Adventure**
   - Hand Card 1 to your kids to begin
   - Watch the excitement unfold!

### Quick Setup Example
```
Card 1 (start) → Kitchen/Bowl
Card 2 (hidden in kitchen) → Under dinner table  
Card 3 (hidden under table) → Chair/Couch
...continue until...
Final Card → Front door (BIG PRIZE!)
```

## Tips for a Great Hunt

1. **Hide clues strategically**: Place each clue where the previous answer leads
2. **Test the difficulty**: Make sure riddles are challenging but solvable
3. **Prepare treats**: Hide small candies or prizes at each location
4. **Set boundaries**: Clearly define which areas of the house are "in play"
5. **Have a finale**: Make the last location special with a big reward!
6. **Safety first**: Ensure all hiding spots are safe and accessible
7. **Have backup clues**: Keep a few extra cards ready in case one gets lost

## Technical Notes

- Uses vanilla JavaScript (no dependencies required)
- Fallback clues included if JSON fails to load
- Print styles use CSS Grid for optimal layout
- Mobile-friendly responsive design
- Cross-browser compatible

## Sample Locations

The included clues cover common household locations:
- Kitchen and dining areas
- Living room and entertainment areas
- Bedrooms and closets
- Bathroom
- Entryway and front door
- Study/office areas

## Extending the Project

### Advanced Features You Could Add
- Timer functionality
- Team scoring system
- Photo verification for answers
- GPS integration for outdoor hunts
- Digital treasure map
- Progressive web app capabilities

### Integration Ideas
- QR codes linking to digital clues
- Audio clues for accessibility
- Multi-language support
- Themed variations (Christmas, birthday, etc.)

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Internet Explorer: Basic support (no animations)

## 🚀 Deployment Options

### Option 1: Local File (Easiest)

Simply open `index.html` in any web browser - no server required!

### Option 2: Self-Hosted Server

Host on your own server for easy access across devices on your network.

#### Using Docker with Nginx

```bash
# Create a directory for the app
mkdir -p /path/to/halloween-hunt

# Copy files to the directory
cp -r * /path/to/halloween-hunt/

# Run nginx container
docker run -d \
  --name halloween-hunt \
  -p 9090:80 \
  -v /path/to/halloween-hunt:/usr/share/nginx/html:ro \
  --restart unless-stopped \
  nginx:alpine
```

Access at: `http://your-server-ip:9090`

#### Using Python (Quick Test)

```bash
cd /path/to/halloween-scavenger-hunt
python3 -m http.server 8080
```

Access at: `http://localhost:8080`

#### Using Node.js

```bash
npx http-server -p 8080
```

### Option 3: Static Hosting Services

Deploy for free on:

- **GitHub Pages**: Push to GitHub and enable Pages in repository settings
- **Netlify**: Drag and drop the folder to deploy
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Cloudflare Pages**: Fast global CDN hosting

### Updating Your Deployment

After making local changes, simply copy the updated files to your server:

```bash
# Example for remote server
scp -r * user@your-server:/path/to/halloween-hunt/
```

The app automatically picks up changes - no restart needed!

---

**Happy Haunting!** 🎃👻🦇

*Created with ❤️ for spooky fun and family adventures*
