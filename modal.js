(function() {
    // Document ready check to ensure the DOM is fully loaded
    document.addEventListener("DOMContentLoaded", function() {

        // Util function to handle URL parameters
        function getUrlParam(paramName) {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get(paramName);
            } catch (error) {
                console.error("Error retrieving URL parameters:", error);
                return null;
            }
        }

        // Initialize modal using Bootstrap's JavaScript
        const qrModal = new bootstrap.Modal(document.getElementById('qrModal'), {
            keyboard: true,
            focus: true
        });

        // Display modal if 'source' param is 'qr'
        if (getUrlParam('source') === 'qr') {
            qrModal.show();
        }

    });

})();