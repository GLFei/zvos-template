function Loading() {
    this.loading = false
}

Loading.prototype.service = function() {
    this.loading = true;
    let loadingDiv = document.createElement('div');
    let loadingHtml = `<div class="zv-loading-content">
                            <div class="zv-loading-icon"></div>
                            <div class="zv-loading-text">正在导出，请稍等...</div>
                       </div>`;

    document.body.appendChild(loadingDiv);
    loadingDiv.innerHTML = loadingHtml;
    loadingDiv.classList.add("zv-loading-wrapper");
    loadingDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
};

Loading.prototype.close = function() {
    this.loading = false;
    let loadingDiv = document.getElementsByClassName('zv-loading-wrapper')[0]
    document.body.removeChild(loadingDiv)
}


let ZvLoading = new Loading()

export default ZvLoading