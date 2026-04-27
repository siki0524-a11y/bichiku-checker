function show(id, visible) {
  const el = document.getElementById(id);
  if (el) el.style.display = visible ? "" : "none";
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function calculate() {
  const members = parseInt(document.getElementById("members").value, 10) || 0;
  const babies = parseInt(document.getElementById("babies").value, 10) || 0;
  const pets = parseInt(document.getElementById("pets").value, 10) || 0;
  const elderly = parseInt(document.getElementById("elderly").value, 10) || 0;
  const days = parseInt(document.getElementById("days").value, 10) || 7;

  const peopleTotal = members + elderly;
  const water = peopleTotal * days * 3;
  const bottleSize = 2;
  const bottlesPerCase = 6;
  const caseLiters = bottleSize * bottlesPerCase;

  const neededCases = Math.ceil(water / caseLiters);
  const shortageText = `あと${water}L必要（約${neededCases}ケース）`;

  let waterShortageEl = document.getElementById("water-shortage");
  if (!waterShortageEl) {
    const qtyEl = document.getElementById("water-qty");
    const row = qtyEl && qtyEl.closest(".item-row");
    const itemInfo = row && row.querySelector(".item-info");
    if (itemInfo) {
      waterShortageEl = document.createElement("div");
      waterShortageEl.id = "water-shortage";
      waterShortageEl.style.fontSize = "12px";
      waterShortageEl.style.color = "#b00020";
      waterShortageEl.style.fontWeight = "700";
      waterShortageEl.style.marginTop = "4px";
      const desc = itemInfo.querySelector(".item-desc");
      if (desc) desc.insertAdjacentElement("afterend", waterShortageEl);
      else itemInfo.appendChild(waterShortageEl);
    }
  }
  if (waterShortageEl) waterShortageEl.textContent = shortageText;
  const rice = (peopleTotal * days * 0.15).toFixed(1);
  const retort = peopleTotal * days * 2;
  const noodle = peopleTotal * days;
  const canQty = Math.ceil((peopleTotal * days) / 2);
  const gas = Math.ceil((peopleTotal * days) / 3);
  const battery = Math.ceil(peopleTotal / 2) || 1;
  const tp = Math.ceil(peopleTotal * days * 0.5);
  const wet = Math.ceil((peopleTotal * days) / 30);
  const kcal = Math.round(peopleTotal * days * 2000);

  setText("water-qty", water);
  setText("rice-qty", rice);
  setText("retort-qty", retort);
  setText("noodle-qty", noodle);
  setText("can-qty", canQty);
  setText("gas-qty", gas);
  setText("battery-qty", battery);
  setText("tp-qty", tp);
  setText("wet-qty", wet);

  show("baby-section", babies > 0);
  if (babies > 0) {
    setText("milk-qty", Math.ceil((babies * days * 8) / 130));
    setText("diaper-qty", babies * days * 7);
    setText("babywipe-qty", Math.ceil((babies * days * 17) / 80));
    setText("babyfood-qty", babies * days * 3);
    setText("baby-count-label", babies + "人分");
  }

  show("pet-section", pets > 0);
  if (pets > 0) {
    setText("petfood-dog-qty", (pets * days * 0.25).toFixed(1));
    setText("petfood-cat-qty", (pets * days * 0.06).toFixed(2));
    setText("petwater-qty", pets * days);
    setText("petsheet-qty", pets * days * 4);
    setText("petcarry-qty", pets);
    setText("pet-count-label", pets + "頭分");
  }

  show("elderly-section", elderly > 0);
  if (elderly > 0) {
    setText("adult-diaper-qty", elderly * days * 5);
    setText("care-wipe-qty", Math.ceil((elderly * days) / 10));
    setText("care-food-qty", elderly * days * 3);
    setText("medicine-qty", days);
    setText("elderly-count-label", elderly + "人分");
  }

  setText("sum-members", members + "人");
  show("sum-baby-row", babies > 0);
  show("sum-pet-row", pets > 0);
  show("sum-elderly-row", elderly > 0);
  setText("sum-babies", babies + "人");
  setText("sum-pets", pets + "頭");
  setText("sum-elderly", elderly + "人");
  setText("sum-days", days + "日分");
  setText("sum-water", water + "L");
  setText("sum-kcal", "約" + kcal.toLocaleString() + "kcal");
  setText("sum-gas", gas + "本");

  let label = members + "人";
  if (babies) label += "・乳幼児" + babies + "人";
  if (pets) label += "・ペット" + pets + "頭";
  if (elderly) label += "・高齢者" + elderly + "人";
  setText("result-title", label + "・" + days + "日分の目安");

  const results = document.getElementById("results");
  if (results) {
    results.classList.add("show");
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (typeof window.afterCalculate === "function") {
    window.afterCalculate({ members, babies, pets, elderly, days });
  }
}
