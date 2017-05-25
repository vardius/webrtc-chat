/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
  var screenWidth = screen.availWidth;
  var screenHeight = screen.availHeight;

  chrome.app.window.create("./../build/index.html", {
    id: "Vardius-WebRTC-Chat",
    outerBounds: {
      width: screenWidth,
      height: screenHeight,
      left: 0,
      top: 0
    }
  });
});
