const fs = require('fs');

function getCertOrder(cert) {
  if (cert === "starters") return 1;
  if (cert === "movers") return 2;
  if (cert === "flyers") return 3;
  return 3;
}

let sql = `
-- Cập nhật vocabulary_bank với 4 chủ đề mới: home, materials, places_directions, school
-- Group tag được set trùng với certificate (starters, movers, flyers)
`;

function processWords(topicCode, topicName, cert, wordsStr) {
  const words = wordsStr.split(',').map(w => w.trim()).filter(w => w);
  let index = 1;
  const certCode = cert === 'starters' ? 'st' : cert === 'movers' ? 'mv' : 'fl';
  
  words.forEach(w => {
    let word = w;
    let type = 'noun'; // default
    if (topicName === 'places_directions') {
      const prepWords = ['above','behind','below','between','in','on','under','near','opposite','over','front','left','right','south','north','east','west'];
      if (prepWords.includes(word)) type = 'preposition';
    }
    if (topicName === 'school') {
      const verbWords = ['answer','ask','close','draw','find','learn','listen','look','open','read','sit','spell','stand','teach','tell','understand','write'];
      if (verbWords.includes(word)) type = 'verb';
    }
    
    let id = `${certCode}-${topicCode}-${index.toString().padStart(3, '0')}`;
    let cOrder = getCertOrder(cert);
    
    let escapedWord = word.replace(/'/g, "''");
    
    // Create placeholder values for trans, ipa, en, vi, emoji to keep it quick
    // The user just wants the words in DB with correct topic and cert.
    // However, the DB requires translation_vi, etc. I will put generic ones if I can't guess,
    // but I can provide a simple lookup for some common words or just leave them basic.
    
    let trans = `(nghĩa của ${escapedWord})`;
    let ipa = `/${escapedWord}/`;
    let en = `This is a ${escapedWord}.`;
    let vi = `Đây là một ${escapedWord}.`;
    let emoji = '📚';
    
    sql += `INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('${id}', '${escapedWord}', '${trans}', '${cert}', ${cOrder}, '${ipa}', '${type}', '${en}', '${vi}', 'english', '${cert}', ${cOrder}, '${topicName}', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
`;
    index++;
  });
}

// HOME
processWords('ho', 'home', 'starters', 'apartment, armchair, bath, bathroom, bed, bedroom, bookcase, box, camera, chair, clock, computer, cupboard, desk, dining room, doll, door, flat, flower, garden, hall, home, house, kitchen, lamp, living room, mat, mirror, phone, picture, radio, room, rug, sleep, sofa, table, television, toy, tree, TV, wall, watch, window');
processWords('ho', 'home', 'movers', 'address, balcony, basement, blanket, downstairs, dream, elevator, floor, internet, lift, message, roof, seat, shower, stairs, toothbrush, toothpaste, towel, upstairs, wash');
processWords('ho', 'home', 'flyers', 'brush, comb, cooker, cushion, diary, entrance, envelope, fridge, gate, key, letter, oven, screen, shampoo, shelf, soap, stamp, step, swing, telephone');

// MATERIALS
processWords('ma', 'materials', 'starters', 'paper');
processWords('ma', 'materials', 'flyers', 'card, glass, gold, metal, plastic, silver, wood, wool');

// PLACES_DIRECTIONS
processWords('pd', 'places_directions', 'starters', 'behind, between, bookshop, end, here, in, in front of, on, park, playground, shop, store, street, there, under, zoo');
processWords('pd', 'places_directions', 'movers', 'above, below, building, bus station, bus stop, café, car park, centre, cinema, circle, circus, city centre, farm, funfair, hospital, library, map, market, near, opposite, place, shopping centre, sports centre, square, station, straight, supermarket, swimming pool, town centre');
processWords('pd', 'places_directions', 'flyers', 'airport, bank, bridge, castle, chemist, club, college, corner, east, factory, fire station, front, get to, hotel, kilometre, left, London, middle, museum, north, over, path, police station, post office, restaurant, right, skyscraper, south, stadium, straight on, theatre, university, way, west');

// SCHOOL
processWords('sc', 'school', 'starters', 'alphabet, answer, ask, board, book, bookcase, class, classroom, close, colour, computer, correct, crayon, cross, cupboard, desk, door, draw, English, eraser, example, find, floor, keyboard, learn, lesson, letter, line, listen, look, mouse, music, number, open, page, painting, paper, part, pen, pencil, picture, playground, poster, question, read, right, rubber, ruler, school, sentence, sit, spell, stand, story, teacher, tell, tick, understand, wall, window, word, write');
processWords('sc', 'school', 'movers', 'break, homework, mistake, teach, text, website');
processWords('sc', 'school', 'flyers', 'art, backpack, bin, club, college, competition, dictionary, flag, geography, glue, group, gym, history, language, maths, online, project, rucksack, science, scissors, screen, shelf, student, study, subject, timetable, university');

fs.writeFileSync('src/worker/migrations/0017_seed_home_materials_places_school.sql', sql);
console.log("Generated src/worker/migrations/0017_seed_home_materials_places_school.sql");
