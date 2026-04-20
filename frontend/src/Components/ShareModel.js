import React from "react";

const ShareModal = ({ onClose, postId }) => {
    const handleShareOnTwitter = () => {
        const tweetText = encodeURIComponent("Check out this post on Breaking Chains: Share Your Struggle, Find Support. #BreakingChains #Support");
        const tweetUrl = encodeURIComponent(window.location.href);
        const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;

        window.open(twitterShareUrl, "_blank");
        onClose();
      };

  const handleShareOnWhatsApp = () => {
    const whatsappText = encodeURIComponent("Check out this post on Breaking Chains: Share Your Struggle, Find Support. #BreakingChains #Support");
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${whatsappText}`;

    window.open(whatsappShareUrl, "_blank");
    onClose();
  };

  const handleShareOnInstagram = () => {
    // Add logic to share on Instagram
    console.log(`Sharing post with ID ${postId} on Instagram`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Share Post</h2>
        <div className="share-options">
          <button onClick={handleShareOnTwitter}>
            <i className="fab fa-twitter"></i> Twitter
          </button>
          <button onClick={handleShareOnWhatsApp}>
            <i className="fab fa-whatsapp"></i> WhatsApp
          </button>
          <button onClick={handleShareOnInstagram}>
            <i className="fab fa-instagram"></i> Instagram
          </button>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShareModal;