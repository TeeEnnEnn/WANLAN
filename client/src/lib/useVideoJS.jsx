import {
  useRef,
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useMemo,
} from "react";
import videojs from "video.js";
import cloneDeep from "lodash.clonedeep";
import { dequal } from "dequal";

// Function copied from
// https://github.com/kentcdodds/use-deep-compare-effect/blob/main/src/index.ts
function useDeepCompareMemoize(value) {
  const ref = useRef(value);
  const signalRef = useRef(0);

  if (!dequal(value, ref.current)) {
    ref.current = value;
    signalRef.current += 1;
  }

  return useMemo(() => ref.current, [signalRef.current]);
}

// Integrating React and video.js is a bit tricky, especially when supporting
// React 18 strict mode. We'll do our best to explain what happens in inline comments.

const VideoJsWrapper = forwardRef(
  (
    { children, videoJsOptions, onReady, onDispose, classNames, ...props },
    playerRef
  ) => {
    const player = playerRef;
    // video.js sometimes mutates the provided options object.
    // We clone it to avoid mutation issues.
    const videoJsOptionsCloned = cloneDeep(videoJsOptions);
    const videoNode = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
      if (!videoNode.current?.parentNode) return;

      // Once we initialize the player, videojs will start mutating the DOM.
      // We need a snapshot of the state just before, so we know what state
      // to reset the DOM to.
      const originalVideoNodeParent =
        videoNode.current.parentNode.cloneNode(true);

      if (!player.current) {
        player.current = videojs(videoNode.current, videoJsOptionsCloned);
        player.current.ready(() => {
          onReady();
        });
      }

      return () => {
        // Whenever something changes in the options object, we
        // want to reinitialize video.js, and destroy the old player by calling `player.current.dispose()`

        if (player.current) {
          player.current.dispose();

          // Unfortunately, video.js heavily mutates the DOM in a way that React doesn't
          // like, so we need to readd the removed DOM elements directly after dispose.
          // More concretely, the node marked with `data-vjs-player` will be removed from the
          // DOM. We are readding the cloned original video node parent as it was when React first rendered it,
          // so it is once again synchronized with React.
          if (
            containerRef.current &&
            videoNode.current?.parentNode &&
            !containerRef.current.contains(videoNode.current.parentNode)
          ) {
            containerRef.current.appendChild(originalVideoNodeParent);
            videoNode.current = originalVideoNodeParent.firstChild;
          }

          player.current = null;
          onDispose();
        }
      };

      // We'll use the serialized videoJsOptions object as a dependency object
    }, [useDeepCompareMemoize(videoJsOptions)]);

    return (
      // TODO: can we get by withour introducing an extra div?
      <div ref={containerRef}>
        <div data-vjs-player>
          <video
            ref={videoNode}
            className={`video-js ${classNames} aspect-video`}
            controls
            autoPlay
            {...props}
          >
            {children}
          </video>
        </div>
      </div>
    );
  }
);

VideoJsWrapper.displayName = "VideoJsWrapper";

export const useVideoJS = (videoJsOptions, classNames = "") => {
  const [ready, setReady] = useState(false);

  // player will contain the video.js player object, once it is ready.
  const player = useRef(null);
  const Video = useCallback(
    ({ children, ...props }) => (
      <VideoJsWrapper
        videoJsOptions={videoJsOptions}
        classNames={classNames}
        onReady={() => setReady(true)}
        onDispose={() => setReady(false)}
        {...props}
        ref={player}
      >
        {children}
      </VideoJsWrapper>
    ),
    [useDeepCompareMemoize(videoJsOptions), classNames]
  );

  return { Video, ready, player: player.current };
};
