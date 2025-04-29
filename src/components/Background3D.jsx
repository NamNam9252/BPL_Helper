const Background3D = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen overflow-hidden">
      <iframe 
        src="https://skybox.blockadelabs.com/e/6a4e1fc51fec30c1b4b1cb2797168a9b" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          border: 'none',
          zIndex: -1
        }}
        allow="fullscreen"
      />
    </div>
  );
};

export default Background3D; 