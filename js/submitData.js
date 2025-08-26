const scriptUrl = "https://script.google.com/macros/s/AKfycbxjYceXn7qXWrtBByQ3CPYjzjk6Ehw5TJdRPyVdn964CpiGu_Tg84QHqcTIClJmbbupBA/exec";

let form = document.querySelector("#formDataSend");

function showMessage(text, type = "success") {
    let msg = document.createElement("div");
    msg.textContent = text;
    msg.style.position = "fixed";
    msg.style.top = "20px";
    msg.style.left = "50%";
    msg.style.transform = "translateX(-50%)";
    msg.style.background = type === "success" ? "#4caf50" : "#f44336";
    msg.style.color = "#fff";
    msg.style.padding = "10px 20px";
    msg.style.borderRadius = "8px";
    msg.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    msg.style.zIndex = "999999999";
    msg.style.fontSize = "16px";
    document.body.appendChild(msg);
    setTimeout(() => {
        msg.remove();
    }, 3000);
}
form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(scriptUrl, {
        method: "POST",
        body: new FormData(form),
    })
    .then((res) => res.text())
    .then((text) => {
        form.reset();
        localStorage.removeItem("cart");
        showMessage("✅ تم إرسال بياناتك بنجاح", "success");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    })
    .catch((error) => {
        showMessage("❌ حدث خطأ أثناء الإرسال", "unsuccess");
    });
});
// https://docs.google.com/spreadsheets/d/1ZFEXavEnW-SNtZZSQJHLSA6MrDMd8ffMwWBN3p88L8U/edit?gid=0#gid=0