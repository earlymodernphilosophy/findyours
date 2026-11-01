const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'src/assets/portraits');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const URLS = {
  'thomas-hobbes': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/Thomas_Hobbes_by_John_Michael_Wright_%28colour%29_%283x4_cropped%29.jpg/500px-Thomas_Hobbes_by_John_Michael_Wright_%28colour%29_%283x4_cropped%29.jpg',
  'david-hume': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/David_Hume_Ramsay.jpg/500px-David_Hume_Ramsay.jpg',
  'blaise-pascal': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/Blaise_Pascal_Versailles%2C_circa_1690.JPG/500px-Blaise_Pascal_Versailles%2C_circa_1690.JPG',
  'immanuel-kant': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/Immanuel_Kant_-_Gemaelde_1.jpg/500px-Immanuel_Kant_-_Gemaelde_1.jpg',
  'gottfried-wilhelm-leibniz': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Christoph_Bernhard_Francke_-_Bildnis_des_Philosophen_Leibniz_%28ca._1695%29.jpg/500px-Christoph_Bernhard_Francke_-_Bildnis_des_Philosophen_Leibniz_%28ca._1695%29.jpg',
  'john-locke': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Godfrey_Kneller_-_Portrait_of_John_Locke_%28Hermitage%29.jpg/500px-Godfrey_Kneller_-_Portrait_of_John_Locke_%28Hermitage%29.jpg',
  'baruch-spinoza': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Spinoza.jpg/500px-Spinoza.jpg',
  'voltaire': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Nicolas_de_Largilli%C3%A8re_-_Portrait_de_Voltaire_%281694-1778%29_en_1718_-_P208_-_mus%C3%A9e_Carnavalet_-_5_%28cropped%29.jpg/500px-Nicolas_de_Largilli%C3%A8re_-_Portrait_de_Voltaire_%281694-1778%29_en_1718_-_P208_-_mus%C3%A9e_Carnavalet_-_5_%28cropped%29.jpg',
  'jean-jacques-rousseau': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Maurice_Quentin_de_La_Tour_-_Portrait_of_Jean-Jacques_Rousseau_-_adjusted.jpg/500px-Maurice_Quentin_de_La_Tour_-_Portrait_of_Jean-Jacques_Rousseau_-_adjusted.jpg',
  'mary-wollstonecraft': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Mary_Wollstonecraft_Portrait.jpg/500px-Mary_Wollstonecraft_Portrait.jpg',
  'ralph-cudworth': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/A_treatise_concerning_eternal_and_immutable_morality_%281731%29_%2814597157587%29.jpg/500px-A_treatise_concerning_eternal_and_immutable_morality_%281731%29_%2814597157587%29.jpg',
  'thomas-reid': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/ThomasReid.jpg/500px-ThomasReid.jpg',
  'margaret-cavendish': 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Margaret_cavendish_from_Luminarium.jpg',
  'nicolas-malebranche': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Portret_van_Nicolas_Malebranche%2C_RP-P-OB-72.656_%28cropped%29.jpg/500px-Portret_van_Nicolas_Malebranche%2C_RP-P-OB-72.656_%28cropped%29.jpg',
  'francis-hutcheson': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Francis_Hutcheson_%281694%E2%80%931746%29%2C_Professor_of_Moral_Philosophy_at_the_University_of_Glasgow.jpg/500px-Francis_Hutcheson_%281694%E2%80%931746%29%2C_Professor_of_Moral_Philosophy_at_the_University_of_Glasgow.jpg',
  'pierre-gassendi': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/PierreGassendi.jpg/500px-PierreGassendi.jpg',
  'christian-wolff': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Christian-Wolff_Gem%C3%A4lde.jpg/500px-Christian-Wolff_Gem%C3%A4lde.jpg',
  'antoine-arnauld': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Antoine_Arnauld4.jpg/500px-Antoine_Arnauld4.jpg',
  'pierre-bayle': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Pierre_Bayle_by_Louis_Ferdinand_Elle.jpg/500px-Pierre_Bayle_by_Louis_Ferdinand_Elle.jpg',
  'henry-more': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Henry_More_Yale_illustration.jpg/500px-Henry_More_Yale_illustration.jpg',
  'martha-nussbaum': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Martha_Nussbaum_2010_%28cropped%29.jpg/500px-Martha_Nussbaum_2010_%28cropped%29.jpg',
  'emilie-du-chatelet': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Emilie_Chatelet_portrait_by_Latour.jpg/500px-Emilie_Chatelet_portrait_by_Latour.jpg',
  'anton-wilhelm-amo': 'https://upload.wikimedia.org/wikipedia/commons/3/39/Anton_Wilhelm_Amo_%28c._1703_%E2%80%93_c._1759%29_-_Dissertatio_inauguralis_philosophica_de_humanae_mentis_apatheia%2C_Wittenberg%2C_1734%2C_title_page.jpg',
  'brutus-buckeye': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Brutus_Buckeye_in_2017.jpg/500px-Brutus_Buckeye_in_2017.jpg',
  'sophie-de-grouchy': 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Sophiedecondorcet.jpg'
};

async function downloadAll() {
  for (const [id, url] of Object.entries(URLS)) {
    const dest = path.join(dir, `${id}.jpg`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 2000) {
      console.log(`[EXISTS] ${id}`);
      continue;
    }

    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buf);
        console.log(`[SAVED] ${id} (${buf.length} bytes)`);
      } else {
        console.log(`[HTTP ${res.status}] ${id}`);
      }
    } catch (e) {
      console.log(`[ERR] ${id}:`, e.message);
    }
  }

  // Copy one for mary-shepherd if missing
  const shepherdDest = path.join(dir, 'mary-shepherd.jpg');
  if (!fs.existsSync(shepherdDest)) {
    const conwaySrc = path.join(dir, 'anne-conway.jpg');
    if (fs.existsSync(conwaySrc)) {
      fs.copyFileSync(conwaySrc, shepherdDest);
      console.log('[COPIED] mary-shepherd from anne-conway');
    }
  }
}

downloadAll();
