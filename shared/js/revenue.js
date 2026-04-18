const AMAZON_AFFILIATE_TAG = "sasakitamotu-22";

function setAffiliateLink(id, keyword) {
  const link = document.getElementById(id);
  if (!link) return;
  const encoded = encodeURIComponent(keyword);
  link.href = "https://www.amazon.co.jp/s?k=" + encoded + "&tag=" + AMAZON_AFFILIATE_TAG;
}

window.afterCalculate = function afterCalculateRevenue(inputs) {
  const section = document.getElementById("recommend-section");
  if (section) section.style.display = "";

  const family = "備蓄 " + inputs.days + "日";
  setAffiliateLink("rec-water", family + " 保存水 2L");
  setAffiliateLink("rec-food", family + " レトルト 非常食");
  setAffiliateLink("rec-hygiene", family + " 衛生用品 生理用品");
  setAffiliateLink("rec-power", family + " モバイルバッテリー カセットガス");
};
