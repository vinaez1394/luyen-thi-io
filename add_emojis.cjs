const fs = require('fs');
const path = require('path');

const EMOJI_MAP = {
  // EASY
  "Set 1: A Visit to the Zoo": "🦁",
  "Set 2: Weekend Activities": "🚴",
  "Set 3: A Cold Day": "❄️",
  "Set 4: Helping Dad in the Kitchen": "👨‍🍳",
  "Set 5: A New Hobby": "🎨",
  
  // HARD
  "Set 1: The School Robot Competition": "🤖",
  "Set 2: A Mysterious Visit to the Museum": "🏺",
  "Set 3: A Day at the TV Studio": "📺",
  "Set 4: The Volcano Project": "🌋",
  "Set 5: The New Art Gallery": "🖼️",
  
  // MED
  "Set 1: A Trip to the Museum": "🏛️",
  "Set 2: A Camping Trip": "⛺",
  "Set 3: The Science Project": "🔬",
  "Set 4: The Lost Suitcase": "🧳",
  "Set 5: The New Music Club": "🎵",
  "Set 6: Preparing for a Party": "🎈",
  "Set 7: Shopping for New Clothes": "👗",
  "Set 8: A Holiday in the Mountains": "⛰️"
};

const dir = 'content/Cambridge/flyers/part2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let sqlStatements = [];
let uploadCommands = [];

files.forEach(file => {
  const filePath = path.join(dir, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  let currentTitle = content.title;
  let matchFound = false;
  
  // If title doesn't have "Set", maybe we need to add it?
  // Actually, wait, some Hard ones might not have "Set X: ".
  // Let's check the map.
  for (const [baseTitle, emoji] of Object.entries(EMOJI_MAP)) {
    // some might already have the emoji or a different prefix.
    // Let's just match the core part of the title if needed, but we can do exact matches first.
    if (currentTitle === baseTitle) {
      content.title = `${baseTitle} ${emoji}`;
      matchFound = true;
      break;
    } else if (baseTitle.includes(currentTitle) || currentTitle.includes(baseTitle)) {
       if (!currentTitle.includes(emoji)) {
          content.title = currentTitle.startsWith("Set") ? `${currentTitle} ${emoji}` : `${baseTitle} ${emoji}`;
          matchFound = true;
          break;
       }
    }
  }

  // Handle the case where the JSON title is just "The School Robot Competition" without "Set 1:"
  if (!matchFound) {
      if (currentTitle === "The School Robot Competition") { content.title = "Set 1: The School Robot Competition 🤖"; matchFound = true; }
      else if (currentTitle === "A Mysterious Visit to the Museum") { content.title = "Set 2: A Mysterious Visit to the Museum 🏺"; matchFound = true; }
      else if (currentTitle === "A Day at the TV Studio") { content.title = "Set 3: A Day at the TV Studio 📺"; matchFound = true; }
      else if (currentTitle === "The Volcano Project") { content.title = "Set 4: The Volcano Project 🌋"; matchFound = true; }
      else if (currentTitle === "The New Art Gallery") { content.title = "Set 5: The New Art Gallery 🖼️"; matchFound = true; }
      else if (currentTitle === "A New Hobby") { content.title = "Set 5: A New Hobby 🎨"; matchFound = true; }
      else if (currentTitle === "A Trip to the Museum") { content.title = "Set 1: A Trip to the Museum 🏛️"; matchFound = true; }
      else if (currentTitle === "A Camping Trip") { content.title = "Set 2: A Camping Trip ⛺"; matchFound = true; }
      else if (currentTitle === "The Science Project") { content.title = "Set 3: The Science Project 🔬"; matchFound = true; }
      else if (currentTitle === "The Lost Suitcase") { content.title = "Set 4: The Lost Suitcase 🧳"; matchFound = true; }
      else if (currentTitle === "The New Music Club") { content.title = "Set 5: The New Music Club 🎵"; matchFound = true; }
      else if (currentTitle === "Preparing for a Party") { content.title = "Set 6: Preparing for a Party 🎈"; matchFound = true; }
      else if (currentTitle === "Shopping for New Clothes") { content.title = "Set 7: Shopping for New Clothes 👗"; matchFound = true; }
      else if (currentTitle === "A Holiday in the Mountains") { content.title = "Set 8: A Holiday in the Mountains ⛰️"; matchFound = true; }
  }

  if (matchFound) {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    // Escape single quotes for SQL
    const safeTitle = content.title.replace(/'/g, "''");
    sqlStatements.push(`UPDATE quiz_catalog SET title = '${safeTitle}' WHERE quiz_id = '${content.id}';`);
    uploadCommands.push(`npx wrangler r2 object put luyen-thi-content/quizzes/cambridge/flyers/part2/${file} --file=${filePath} --remote`);
    console.log(`Updated ${file} -> ${content.title}`);
  }
});

fs.writeFileSync('update_d1.sql', sqlStatements.join('\n'));
fs.writeFileSync('upload_r2.sh', uploadCommands.join('\n'));
console.log(`Prepared ${sqlStatements.length} updates.`);
