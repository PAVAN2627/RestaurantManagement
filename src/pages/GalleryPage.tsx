import { galleryImages } from "@/data/menuData";

const GalleryPage = () => (
  <main className="pt-24 pb-20 min-h-screen bg-background">
    <div className="container">
      <div className="text-center mb-12">
        <p className="font-body text-primary font-semibold text-sm tracking-widest uppercase mb-2">Our Gallery</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">A Feast for the Eyes</h1>
        <p className="font-body text-muted-foreground max-w-md mx-auto">Discover the artistry behind every dish we serve.</p>
      </div>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {galleryImages.map((img, i) => (
          <div key={i} className="break-inside-avoid rounded-xl overflow-hidden group">
            <img
              src={img}
              alt={`Gallery image ${i + 1}`}
              className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default GalleryPage;
