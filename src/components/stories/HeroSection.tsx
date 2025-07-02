
interface HeroSectionProps {
  heroImage: string;
}

export const HeroSection = ({ heroImage }: HeroSectionProps) => {
  return (
    <div className="relative h-32 overflow-hidden">
      <img
        src={heroImage}
        alt="Stories Collection"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    </div>
  );
};
