export const ICONS = {
  email: "M24,4.5 L12,13.5 L0,4.5 C0,3.66796875 0.66796875,3 1.5,3 L22.5,3 C23.3320312,3 24,3.66796875 24,4.5 Z M0,7.1953125 L12,16.1953125 L24,7.1953125 L24,19.5 C24,20.3320312 23.3320312,21 22.5,21 L1.5,21 C0.66796875,21 0,20.3320312 0,19.5 L0,7.1953125 Z",
  twitter: "M24,4.296875 C23.109375,4.6953125 22.171875,4.96484375 21.1640625,5.08203125 C22.1953125,4.47265625 22.96875,3.5 23.3320312,2.3515625 C22.3945312,2.9140625 21.328125,3.32421875 20.2265625,3.546875 C19.3007812,2.609375 18.0234375,2 16.6054688,2 C13.8867188,2 11.6953125,4.19140625 11.6953125,6.91015625 C11.6953125,7.296875 11.71875,7.6953125 11.8007812,8.046875 C7.72265625,7.82421875 4.11328125,5.97265625 1.6640625,2.99609375 C1.25390625,3.72265625 0.99609375,4.47265625 0.99609375,5.38671875 C0.99609375,7.07421875 1.86328125,8.57421875 3.19921875,9.46484375 C2.390625,9.44140625 1.640625,9.21875 0.97265625,8.85546875 L0.97265625,8.9140625 C0.97265625,11.3046875 2.671875,13.296875 4.921875,13.7421875 C4.5,13.859375 4.0546875,13.9179688 3.609375,13.9179688 C3.3046875,13.9179688 3,13.8828125 2.6953125,13.8242188 C3.3046875,15.7695312 5.14453125,17.2226562 7.27734375,17.2460938 C5.61328125,18.5820312 3.46875,19.578125 1.171875,19.578125 C0.7734375,19.578125 0.38671875,19.5546875 0,19.4960938 C2.16796875,20.890625 4.78125,21.5 7.55859375,21.5 C16.6054688,21.5 21.5507812,14 21.5507812,7.49609375 L21.5507812,6.8515625 C22.5,6.16015625 23.3320312,5.3046875 24,4.296875 Z",
  github: "M22.2539062,7.4375 C23.3554688,8.83203125 24,10.5195312 24,12.4648438 C24,19.4960938 19.5,21.9921875 12,21.9921875 C4.5,21.9921875 0,19.4960938 0,12.5 C0,10.5546875 0.64453125,8.83203125 1.74609375,7.47265625 C1.5,6.13671875 1.25390625,3.828125 2.00390625,2 C4.359375,2.1875 6.19921875,3.30078125 7.21875,4.109375 C8.671875,3.72265625 10.2773438,3.5 12,3.5 C13.7226562,3.5 15.328125,3.72265625 16.7460938,4.109375 C17.8007812,3.30078125 19.640625,2.1875 21.9960938,2 C22.7460938,3.8046875 22.5,6.13671875 22.2539062,7.4375 Z M12,20.4921875 C18.5039062,20.4921875 20.8359375,18.5 20.8359375,15.5 C20.8359375,11.9960938 18,11.2460938 16.5,11.2460938 C15,11.2460938 15,11.4921875 12,11.4921875 C9,11.4921875 9,11.2460938 7.5,11.2460938 C6,11.2460938 3.1640625,11.9960938 3.1640625,15.5 C3.1640625,18.5 5.49609375,20.4921875 12,20.4921875 Z M17.0039062,15.7460938 C17.0039062,17.4921875 16.4414062,17.9960938 15.75,17.9960938 C15.0585938,17.9960938 14.4960938,17.4921875 14.4960938,15.7460938 C14.4960938,14 15.0585938,13.4960938 15.75,13.4960938 C16.4414062,13.4960938 17.0039062,14 17.0039062,15.7460938 Z M9.50390625,15.7460938 C9.50390625,17.4921875 8.94140625,17.9960938 8.25,17.9960938 C7.55859375,17.9960938 6.99609375,17.4921875 6.99609375,15.7460938 C6.99609375,14 7.55859375,13.4960938 8.25,13.4960938 C8.94140625,13.4960938 9.50390625,14 9.50390625,15.7460938 Z"
};

const Glyph = ({ icon, width = 24, height = 24 }) => {
  const path = ICONS[icon];
  if (!path) { console.warn(`Icon ${icon} does not exist`); }
  
  return (
    <svg width={width} height={height} viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  )
}

export default Glyph;