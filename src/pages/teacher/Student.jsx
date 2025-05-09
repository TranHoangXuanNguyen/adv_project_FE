import '../../assets/css/layouts/teacher.css';
export default function Student() {
    const folders = [
        { name: 'PNV 26A', bgColor: 'bg-[#eafaf1]', className: 'folder-shape' },
        { name: 'PNV 26B', bgColor: 'bg-[#E8F0F7]', className: 'folder-shape2' },
        { name: 'PNV 27A', bgColor: 'bg-[#E8F0F7]', className: 'folder-shape2' },
        { name: 'PNV 27B', bgColor: 'bg-[#E8F0F7]', className: 'folder-shape2' },
        { name: 'PNV 28A', bgColor: 'bg-[#E8F0F7]', className: 'folder-shape2' },
        { name: 'PNV 28B', bgColor: 'bg-[#E8F0F7]', className: 'folder-shape2' },
        { name: 'PNV 29A', bgColor: 'bg-[#E8F0F7]', className: 'folder-shape2' },
        { name: 'PNV 29B', bgColor: 'bg-[#E8F0F7]', className: 'folder-shape2' },
        { name: 'PNV 30B', bgColor: 'bg-[#E8F0F7]', className: 'folder-shape2' },
      ];
    
      return (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Class</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {folders.map((folder, index) => (
              <div 
                key={index} 
                className={`relative ${folder.className} ${folder.bgColor} w-64 h-40 rounded-xl shadow-md p-4 pt-6 cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg`}
              >
                <h3 className="text-md font-semibold mb-3">{folder.name}</h3>
                <div className="flex gap-2 mb-8">
                  <img src="https://i.pinimg.com/736x/a2/b6/3f/a2b63f96c4954e47ff840d861f419532.jpg" 
                       className="w-8 h-8 rounded-full border shadow" 
                       alt="Student" />
                  <img src="https://i.pinimg.com/736x/9c/72/64/9c72644522ad8869b05da35bb0c12e9e.jpg" 
                       className="w-8 h-8 rounded-full border shadow" 
                       alt="Student" />
                  <img src="https://i.pinimg.com/736x/86/0b/f2/860bf2146b774f039046ea0edd566c37.jpg" 
                       className="w-8 h-8 rounded-full border shadow" 
                       alt="Student" />
                </div>
                <div className="absolute bottom-3 right-3 w-6 h-6">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <rect x="3" y="3" width="18" height="18" rx="3" fill="black"/>
                    <rect x="7" y="6" width="10" height="2" rx="1" fill="white"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
};