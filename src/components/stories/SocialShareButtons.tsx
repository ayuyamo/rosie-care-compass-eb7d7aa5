
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

interface SocialShareButtonsProps {
  storyTitle: string;
}

export const SocialShareButtons = ({ storyTitle }: SocialShareButtonsProps) => {
  const shareStory = (platform: string, title: string) => {
    const url = window.location.href;
    const text = `Check out this inspiring story: "${title}"`;

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
    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <span className="text-sm font-medium text-gray-600">Share this story:</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => shareStory('facebook', storyTitle)}
          className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
          title="Share on Facebook"
        >
          <Facebook className="h-4 w-4 text-blue-600" />
        </button>
        <button
          onClick={() => shareStory('twitter', storyTitle)}
          className="p-2 rounded-full bg-sky-50 hover:bg-sky-100 transition-colors"
          title="Share on Twitter"
        >
          <Twitter className="h-4 w-4 text-sky-600" />
        </button>
        <button
          onClick={() => shareStory('linkedin', storyTitle)}
          className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
          title="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4 text-blue-700" />
        </button>
        <button
          onClick={() => shareStory('instagram', storyTitle)}
          className="p-2 rounded-full bg-pink-50 hover:bg-pink-100 transition-colors"
          title="Share on Instagram"
        >
          <Instagram className="h-4 w-4 text-pink-600" />
        </button>
      </div>
    </div>
  );
};
