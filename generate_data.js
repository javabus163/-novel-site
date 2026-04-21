const fs = require('fs');
const path = require('path');

const WORKSPACE = 'c:\\Users\\86199\\.qclaw\\workspace';
const DATA_DIR = path.join(WORKSPACE, 'novel_site', 'data');

// 中文数字到阿拉伯数字的映射
const CN_NUMBERS = {
  '一': 1, '二': 2, '三': 3, '四': 4, '五': 5,
  '六': 6, '七': 7, '八': 8, '九': 9, '十': 10,
  '零': 0
};

function cnNumberToInt(cnStr) {
  let result = 0;
  let temp = 0;
  for (let i = 0; i < cnStr.length; i++) {
    const char = cnStr[i];
    const num = CN_NUMBERS[char];
    if (num === undefined) continue;
    if (char === '十') {
      if (temp === 0) temp = 1;
      result += temp * 10;
      temp = 0;
    } else if (char === '百') {
      result += temp * 100;
      temp = 0;
    } else {
      temp = temp * 10 + num;
    }
  }
  return result + temp;
}

function extractChapterNumber(filename) {
  const match = filename.match(/^第([一二三四五六七八九十零]+)章_/);
  if (match) {
    return cnNumberToInt(match[1]);
  }
  return 0;
}

function extractTitle(filename) {
  const match = filename.match(/^第[一二三四五六七八九十零]+章_(.+)\.md$/);
  if (match) {
    const chapterNum = filename.match(/^第([一二三四五六七八九十零]+)章_/)[1];
    return `第${chapterNum}章 ${match[1]}`;
  }
  return filename.replace(/\.md$/, '');
}

function scanChapters(novelDir) {
  const files = fs.readdirSync(novelDir)
    .filter(f => /^第[一二三四五六七八九十零]+章_.+\.md$/.test(f))
    .map(f => ({
      filename: f,
      number: extractChapterNumber(f),
      filepath: path.join(novelDir, f)
    }))
    .sort((a, b) => a.number - b.number);

  return files.map(item => {
    const content = fs.readFileSync(item.filepath, 'utf-8');
    return {
      title: extractTitle(item.filename),
      content: content
    };
  });
}

const novels = [
  {
    id: 'doomsday',
    dir: 'novel_doomsday',
    title: '灰烬纪元',
    author: 'AI创作',
    description: '2089年，黑雾事件后的末日世界，前急诊科医生林渊在废墟中醒来，踏上寻找妹妹的旅程。灰行者横行，安全区腐败，免疫者的血液成为各方争夺的钥匙。',
    genre: '科幻末日',
    color: '#ff4136'
  },
  {
    id: 'login',
    dir: 'novel_login',
    title: '登录',
    author: 'AI创作',
    description: '2031年，AI替代浪潮下，普通青年林默进入虚拟游戏世界，获得全服唯一的ERROR天赋。靠着层出不穷的BUG金手指，从被嘲笑的"废物"成长为挑战游戏规则的传奇玩家。',
    genre: '网游竞技',
    color: '#0074D9'
  },
  {
    id: 'bazong',
    dir: 'novel_霸总',
    title: '霸总他真香了',
    author: 'AI创作',
    description: '互联网大厂裁员潮中，失业女青年苏晚霉运连连，被迫与霸道总裁顾北辰签订契约婚姻。从互看不顺眼到双向心动，一场甜宠又爆笑的真香之旅。',
    genre: '都市甜宠',
    color: '#FF69B4'
  }
];

// 创建 data 目录
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log('Created directory:', DATA_DIR);
}

// 生成各小说章节数据
for (const novel of novels) {
  const novelPath = path.join(WORKSPACE, novel.dir);
  const chapters = scanChapters(novelPath);
  const outputPath = path.join(DATA_DIR, `${novel.id}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(chapters, null, 2), 'utf-8');
  console.log(`Generated ${novel.id}.json with ${chapters.length} chapters`);
}

// 生成 books.json
const books = novels.map(n => {
  const chaptersPath = path.join(DATA_DIR, `${n.id}.json`);
  const chaptersData = JSON.parse(fs.readFileSync(chaptersPath, 'utf-8'));
  return {
    id: n.id,
    title: n.title,
    author: n.author,
    description: n.description,
    genre: n.genre,
    chapters: chaptersData.length,
    color: n.color
  };
});

const booksPath = path.join(DATA_DIR, 'books.json');
fs.writeFileSync(booksPath, JSON.stringify(books, null, 2), 'utf-8');
console.log(`Generated books.json with ${books.length} books`);

console.log('\nAll data files generated successfully!');
