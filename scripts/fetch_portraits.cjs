const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'src/assets/portraits');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const list = [
  { id: 'francis-bacon', wiki: 'Francis Bacon' },
  { id: 'jeremy-bentham', wiki: 'Jeremy Bentham' },
  { id: 'george-berkeley', wiki: 'George Berkeley' },
  { id: 'robert-boyle', wiki: 'Robert Boyle' },
  { id: 'edmund-burke', wiki: 'Edmund Burke' },
  { id: 'joseph-butler', wiki: 'Joseph Butler' },
  { id: 'samuel-clarke', wiki: 'Samuel Clarke' },
  { id: 'anne-conway', wiki: 'Anne Conway (philosopher)' },
  { id: 'rene-descartes', wiki: 'René Descartes' },
  { id: 'isaac-newton', wiki: 'Isaac Newton' },
  { id: 'jonathan-edwards', wiki: 'Jonathan Edwards (theologian)' },
  { id: 'pierre-gassendi', wiki: 'Pierre Gassendi' },
  { id: 'sophie-de-grouchy', wiki: 'Sophie de Condorcet' },
  { id: 'thomas-hobbes', wiki: 'Thomas Hobbes' },
  { id: 'david-hume', wiki: 'David Hume' },
  { id: 'blaise-pascal', wiki: 'Blaise Pascal' },
  { id: 'francis-hutcheson', wiki: 'Francis Hutcheson (philosopher)' },
  { id: 'immanuel-kant', wiki: 'Immanuel Kant' },
  { id: 'gottfried-wilhelm-leibniz', wiki: 'Gottfried Wilhelm Leibniz' },
  { id: 'john-locke', wiki: 'John Locke' },
  { id: 'nicolas-malebranche', wiki: 'Nicolas Malebranche' },
  { id: 'baruch-spinoza', wiki: 'Baruch Spinoza' },
  { id: 'margaret-cavendish', wiki: 'Margaret Cavendish, Duchess of Newcastle-upon-Tyne' },
  { id: 'emilie-du-chatelet', wiki: 'Émilie du Châtelet' },
  { id: 'thomas-reid', wiki: 'Thomas Reid' },
  { id: 'jean-jacques-rousseau', wiki: 'Jean-Jacques Rousseau' },
  { id: 'voltaire', wiki: 'Voltaire' },
  { id: 'mary-wollstonecraft', wiki: 'Mary Wollstonecraft' },
  { id: 'pierre-bayle', wiki: 'Pierre Bayle' },
  { id: 'antoine-arnauld', wiki: 'Antoine Arnauld' },
  { id: 'ralph-cudworth', wiki: 'Ralph Cudworth' },
  { id: 'christian-wolff', wiki: 'Christian Wolff (philosopher)' },
  { id: 'anton-wilhelm-amo', wiki: 'Anton Wilhelm Amo' },
  { id: 'mary-shepherd', wiki: 'Lady Mary Shepherd' },
  { id: 'henry-more', wiki: 'Henry More' },
  { id: 'martha-nussbaum', wiki: 'Martha Nussbaum' },
  { id: 'brutus-buckeye', wiki: 'Brutus Buckeye' }
];

async function getWikiThumb(title) {
  try {
    const url = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=pageimages&format=json&pithumbsize=600';
    const res = await fetch(url, { headers: { 'User-Agent': 'PhilosopherMatcherApp/1.0 (academic quiz)' } });
    const data = await res.json();
    const page = Object.values(data.query.pages)[0];
    return page && page.thumbnail ? page.thumbnail.source : null;
  } catch (e) {
    return null;
  }
}

async function run() {
  for (const item of list) {
    const filePath = path.join(dir, `${item.id}.jpg`);
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
      console.log(`[EXISTS] ${item.id}`);
      continue;
    }

    let src = await getWikiThumb(item.wiki);
    if (!src) {
      // Try fallback query without parentheses
      const fallbackTitle = item.wiki.split(' (')[0].split(',')[0];
      src = await getWikiThumb(fallbackTitle);
    }

    if (src) {
      try {
        const imgRes = await fetch(src, { headers: { 'User-Agent': 'PhilosopherMatcherApp/1.0' } });
        const buf = Buffer.from(await imgRes.arrayBuffer());
        fs.writeFileSync(filePath, buf);
        console.log(`[SUCCESS] Downloaded ${item.id} (${buf.length} bytes)`);
      } catch (err) {
        console.log(`[FAILED FETCH] ${item.id}:`, err.message);
      }
    } else {
      console.log(`[NO THUMB] ${item.id} (${item.wiki})`);
    }

    // Small delay to be respectful to API
    await new Promise((r) => setTimeout(r, 200));
  }
  console.log('ALL DONE!');
}

run();
