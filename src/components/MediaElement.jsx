import React, { forwardRef } from 'react';

/**
 * MediaElement — Smart media renderer.
 * Detects if a URL points to a video file and renders <video> or <img> accordingly.
 * Drop-in replacement for <img> tags — pass the same props (src, alt, style, className, etc.)
 */

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.m4v', '.avi'];

export function isVideoUrl(url) {
  if (!url) return false;
  try {
    const pathname = new URL(url, window.location.origin).pathname.toLowerCase();
    return VIDEO_EXTENSIONS.some(ext => pathname.endsWith(ext));
  } catch {
    // Fallback: simple string check
    const lower = url.toLowerCase().split('?')[0];
    return VIDEO_EXTENSIONS.some(ext => lower.endsWith(ext));
  }
}

const MediaElement = forwardRef(({ src, alt, style, className, loading, videoProps, ...rest }, ref) => {
  if (isVideoUrl(src)) {
    return (
      <video
        ref={ref}
        src={src}
        className={className}
        style={{ ...style, objectFit: style?.objectFit || 'cover' }}
        autoPlay
        loop
        muted
        playsInline
        {...videoProps}
        {...rest}
      />
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      style={style}
      className={className}
      loading={loading}
      {...rest}
    />
  );
});

MediaElement.displayName = 'MediaElement';

export default MediaElement;
