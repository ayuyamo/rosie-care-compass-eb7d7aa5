
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

interface ShareButtonsProps {
  storyTitle: string;
  storyContent: string;
}

const ShareButtons = ({ storyTitle, storyContent }: ShareButtonsProps) => {
  const shareStory = (platform: string, storyTitle: string, storyContent: string) => {
    const url = window.location.href;
    const text = `Check out this inspiring story: "${storyTitle}"`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'instagram':
        navigator.clipboard.writeText(`${text}\n\n${url}`);
        alert('Story link copied to clipboard! You can now paste it on Instagram.');
        break;
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600 font-medium">Share:</span>
      <button
        onClick={() => shareStory('facebook', storyTitle, storyContent)}
        className="p-2.5 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors active:scale-95"
        title="Share on Facebook"
      >
        <Facebook className="h-4 w-4 text-blue-600" />
      </button>
      <button
        onClick={() => shareStory('twitter', storyTitle, storyContent)}
        className="p-2.5 rounded-full bg-sky-100 hover:bg-sky-200 transition-colors active:scale-95"
        title="Share on Twitter"
      >
        <Twitter className="h-4 w-4 text-sky-600" />
      </button>
      <button
        onClick={() => shareStory('linkedin', storyTitle, storyContent)}
        className="p-2.5 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors active:scale-95"
        title="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4 text-blue-700" />
      </button>
      <button
        onClick={() => shareStory('instagram', storyTitle, storyContent)}
        className="p-2.5 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors active:scale-95"
        title="Share on Instagram"
      >
        <Instagram className="h-4 w-4 text-pink-600" />
      </button>
    </div>
  );
};

export default ShareButtons;
