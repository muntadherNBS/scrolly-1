/* =========================================================
   Facts taken from nbs.iq (home, about, partnership, brand pages,
   perfume-bottle-glass, contact). Edit here; every page reads it.
   ========================================================= */
(function () {
  "use strict";
  const N = (ar, en) => ({ ar, en });

  const BRANCHES = [
    { id: "sarafiya", name: N("فرع الصرافية", "Al-Sarafiya branch"), short: N("الصرافية", "Al-Sarafiya"), phone: "07700004462", wa: "9647700004462",
      addr: N("بغداد – الصرافية، محلة 118 – زقاق 1 – دار 8/67", "Baghdad – Al-Sarafiya, Plot 118 – Alley 1 – House 8/67"),
      map: "https://www.google.com/maps/search/?api=1&query=Al-Sarafiya%2C%20Baghdad" },
    { id: "shorja", name: N("فرع الشورجة", "Al-Shorja branch"), short: N("الشورجة", "Al-Shorja"), phone: "07902406969", wa: "9647902406969",
      addr: N("بغداد – سوق الشورجة", "Baghdad – Al-Shorja market"),
      map: "https://www.google.com/maps/search/?api=1&query=Al-Shorja%20market%2C%20Baghdad" }
  ];
  const EMAIL = "nbsiqofficial@gmail.com";

  const HOUSES = [
    { id: "givaudan", code: "G", name: "Givaudan", tag: N("عطور فاخرة", "Luxury Scents"), color: "#37b3a8",
      d: N("رائدة عالمية في العطور والجمال، بأكثر من 163 موقعاً في 52 دولة وأكثر من 78 موقع إنتاج. شريكنا منذ 2016.",
           "A global leader in fragrance & beauty, with over 163 locations in 52 countries and over 78 production sites. Our partner since 2016."),
      stats: [[163, N("موقعاً", "locations")], [52, N("دولة", "countries")], [78, N("موقع إنتاج", "production sites")]], since: 2016 },
    { id: "adf", code: "ADF", name: "Amour De Fleurs", tag: N("روائح أنيقة", "Elegant Aromas"), color: "#d6879a",
      d: N("عطور زيتية القاعدة تُوقظ حاسة الشم وتفتح الخيال على عالم واسع ملوّن بالروائح الرفيعة.",
           "Oil-based fragrances that heighten the sense of smell and open the mind to a wide, colourful world of exquisite scent.") },
    { id: "royal", code: "R", name: "Royal Essence", tag: N("نفحات ساحرة", "Enchanted Infusions"), color: "#c9a35c",
      d: N("نوتات فاخرة من أجود المكوّنات حول العالم، يصوغها عطّارون بخبرة عقود، وتخضع لفحص صارم قبل وصولها.",
           "Premium notes from the finest ingredients worldwide, composed by perfumers with decades of experience and rigorously tested before they arrive.") },
    { id: "florchem", code: "FL", name: "Florchem", tag: N("مختارات راقية", "Exquisite Selection"), color: "#c96f4a",
      d: N("لمسة إسبانية في العطر: زيوت عملية وممتعة بجودة ثابتة، يُفحص كل مكوّن فيها ليتجاوز توقّعات الزبون.",
           "A Spanish touch of scent: practical, enjoyable oils of consistent quality, with every component tested to exceed customer expectations.") },
    { id: "european", code: "EU", name: "European", tag: N("جاذبية لا تزول", "Timeless Appeal"), color: "#3a68ab",
      d: N("عطور صناعية أوروبية بروائح طبيعية — زيوت عطرية ومستخلصات نباتية بمكوّنات نادرة تدوم طويلاً.",
           "European industrial fragrances with natural scents — essential oils and plant extracts, crafted with rare, long-lasting ingredients.") }
  ];

  const GLASS = [
    { id: "spray", name: N("بخّاخ", "Spray"), d: N("قوارير بمضخّة رذاذ — للعطور الكحولية الجاهزة للبيع.", "Bottles with a mist pump — for alcohol-based perfumes ready for sale.") },
    { id: "crimp", name: N("كبس", "Crimp"), d: N("قوارير تُغلق بالكبس بمعدّات التعبئة — إحكام ثابت لكل قطعة.", "Bottles sealed by crimping on filling equipment — a consistent seal on every piece.") },
    { id: "tola", name: N("تولة", "Tola"), d: N("التولة التقليدية للزيوت المركّزة — بطابعها الشرقي المعروف.", "The traditional tola for concentrated oils — with its familiar eastern character.") },
    { id: "oil", name: N("زيت", "Oil bottle"), d: N("قوارير صغيرة للزيت بعود أو كرة — للاستخدام اليومي.", "Small oil bottles with a stick or roller — for everyday use.") }
  ];

  const BOARD = [
    { n: N("صلاح حسن", "Salah Hasan"), r: N("المالك", "Owner") },
    { n: N("حيدر صلاح حسن", "Hayder Salah Hassan"), r: N("المدير التنفيذي", "CEO") },
    { n: N("غياث صلاح حسن", "Ghayath Salah Hassan"), r: N("نائب المدير التنفيذي", "Deputy CEO") }
  ];

  window.NBS_DATA = { N, BRANCHES, EMAIL, HOUSES, GLASS, BOARD, SINCE: 1980,
    LIBRARY: "https://nooralnibras.com",
    SOCIAL: [["Instagram", "https://www.instagram.com/nbs.iq"], ["TikTok", "https://www.tiktok.com/@nbss.iq"], ["Facebook", "https://www.facebook.com/NorAlnibras.iq"]] };
})();
