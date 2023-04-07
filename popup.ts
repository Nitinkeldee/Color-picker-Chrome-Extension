const btn = document.querySelector(".changeColorBtn") as HTMLButtonElement;
const colorGrid = document.querySelector(".colorGrid") as HTMLDivElement;
const colorValue = document.querySelector(".colorValue") as HTMLSpanElement;

btn.addEventListener("click", async () => {
  chrome.storage.sync.get("color", ({ color }) => {
    console.log("color: ", color);
  });
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    async (injectionResults) => {
      const [data] = injectionResults;
      if (data.result) {
        const color = data.result.sRGBHex;
        colorGrid.style.backgroundColor = color;
        colorValue.innerText = color;
        try {
          await navigator.clipboard.writeText(color);
        } catch (err) {
          console.error(err);
        }
      }
    }
  );
});

async function pickColor(): Promise<any> {
  try {
    // Picker
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
  } catch (err) {
    console.error(err);
  }
}
