document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".dropdownBtn").forEach(button => {
        button.addEventListener("click", function () {
            let dropdown = this.parentElement;
            let content = dropdown.querySelector(".dropdownContent");
            let img = this.querySelector("img");

            // Kiểm tra nếu dropdown đang mở
            let isActive = dropdown.classList.contains("active");

            // Đóng tất cả các dropdown khác
            document.querySelectorAll(".dropdown").forEach(item => {
                if (item !== dropdown) {
                    item.classList.remove("active");
                    let itemContent = item.querySelector(".dropdownContent");
                    let itemImg = item.querySelector(".dropdownBtn img");
                    if (itemContent) itemContent.style.maxHeight = null;
                    if (itemImg) itemImg.src = "/image/productdetail/ic_right.png"; // Reset icon
                }
            });

            // Nếu dropdown hiện tại đang đóng, thì mở nó ra
            if (!isActive) {
                dropdown.classList.add("active");
                if (content) content.style.maxHeight = content.scrollHeight + "px"; 
                img.src = "/image/productdetail/ic_down.png"; // Đổi icon khi mở
            }
        });
    });
});