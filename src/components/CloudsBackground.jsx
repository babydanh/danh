import './CloudsBackground.css';

export default function CloudsBackground() {
  return (
    <div className="clouds-container">
      <div className="clouds-sky"></div>
      
      {/* Các lớp mây trôi tốc độ khác nhau để tạo Parallax 3D */}
      <div className="cloud-layer layer-1">
        <div className="cloud cloud-a"></div>
        <div className="cloud cloud-b"></div>
      </div>
      
      <div className="cloud-layer layer-2">
        <div className="cloud cloud-c"></div>
        <div className="cloud cloud-d"></div>
      </div>
      
      <div className="cloud-layer layer-3">
        <div className="cloud cloud-e"></div>
        <div className="cloud cloud-f"></div>
      </div>
    </div>
  );
}
