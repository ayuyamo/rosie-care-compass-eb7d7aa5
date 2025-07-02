
interface SectionHeaderProps {
  sectionName: string;
  storiesCount: number;
  isVisible: boolean;
  headerRef: React.RefObject<HTMLDivElement>;
}

export const SectionHeader = ({ sectionName, storiesCount, isVisible, headerRef }: SectionHeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div ref={headerRef} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{sectionName}</h1>
          <p className="text-gray-600 text-lg">{storiesCount} inspiring stories to discover</p>
        </div>
      </div>
    </div>
  );
};
