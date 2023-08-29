document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("imageInput");
    const previewImage = document.getElementById("previewImage");
    const compressButton = document.getElementById("compressButton");
    const downloadLink = document.getElementById("downloadLink");
    const slider = document.getElementById("compressionSlider");
    const sliderValue = document.getElementById("sliderValue");

    sliderValue.textContent = `${slider.value}%`;

    slider.addEventListener("input", function () {
        sliderValue.textContent = `${slider.value}%`;
    });

    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                compressButton.disabled = false;
                downloadLink.style.display = "none";
            };
            reader.readAsDataURL(file);
        }
    });

    compressButton.addEventListener("click", function () {
        const image = new Image();
        image.src = previewImage.src;

        image.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const maxWidth = 800;
            const maxHeight = 800;
            const compressionPercentage = 100 - (slider.value / 100); // Get compression percentage
            let width = image.width;
            let height = image.height;

            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }

            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(image, 0, 0, width, height);

            canvas.toBlob(function (blob) {
                const compressedFile = new File([blob], "compressed_image.jpg", { type: "image/jpeg" });
                const compressedDataUrl = URL.createObjectURL(compressedFile);
                previewImage.src = compressedDataUrl;

                downloadLink.href = compressedDataUrl;
                downloadLink.style.display = "block";
            }, "image/jpeg", compressionPercentage); // Use compressionPercentage for compression quality
        };
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const mouseFollower = document.querySelector(".mouse-follower");

    document.addEventListener("mousemove", (event) => {
        const { clientX, clientY } = event;
        mouseFollower.style.left = `${clientX}px`;
        mouseFollower.style.top = `${clientY}px`;
    });
});

const dropContainer = document.getElementById("dropContainer");

dropContainer.addEventListener("dragover", function (event) {
    event.preventDefault();
    dropContainer.classList.add("hover");
});

dropContainer.addEventListener("dragleave", function (event) {
    event.preventDefault();
    dropContainer.classList.remove("hover");
});

dropContainer.addEventListener("drop", function (event) {
    event.preventDefault();
    dropContainer.classList.remove("hover");

    const file = event.dataTransfer.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            compressButton.disabled = false;
            downloadLink.style.display = "none";

            // Show the preview container
            previewContainer.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});
