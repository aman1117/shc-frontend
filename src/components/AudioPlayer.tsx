"use client";

import { useRef, useState, useEffect } from "react";
import { Loader2, Pause, Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type AudioState = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isMetadataLoaded: boolean;
};

type AudioPlayerProps = {
  audioLink: string;
  title?: string;
  subtitle?: string;
  showProgress?: boolean;
};

const AudioPlayer = ({
  audioLink,
  title = "",
  subtitle = "",
  showProgress = false,
}: AudioPlayerProps) => {
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isMetadataLoaded: false,
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  function play() {
    if (audioRef.current && audioState.isMetadataLoaded) {
      setAudioState((prev) => ({ ...prev, isPlaying: true }));
      audioRef.current.play();
    }
  }

  function pause() {
    if (audioRef.current) {
      setAudioState((prev) => ({ ...prev, isPlaying: false }));
      audioRef.current.pause();
    }
  }

  function updateTime() {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setAudioState((prev) => ({ ...prev, currentTime, duration }));
    }
  }

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  function handleSeek(event: React.MouseEvent<HTMLDivElement>) {
    if (audioRef.current) {
      const progressBar = event.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const percentage = offsetX / rect.width;
      const seekTime = audioRef.current.duration * percentage;
      audioRef.current.currentTime = seekTime;
    }
  }

  function handleAudioEnded() {
    setAudioState((prev) => ({ ...prev, isPlaying: false }));
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setAudioState((prev) => ({ ...prev, isMetadataLoaded: true }));
        updateTime();
      });
      audioRef.current.addEventListener("ended", handleAudioEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadedmetadata", () => {
          setAudioState((prev) => ({ ...prev, isMetadataLoaded: true }));
          updateTime();
        });
        audioRef.current.removeEventListener("ended", handleAudioEnded);
      }
    };
  }, []);

  return (
    <div className="flex flex-col border border-border px-4 py-2 rounded-lg w-9/12">
      <div className="flex justify-between items-center py-3">
        {title !== "" && subtitle !== "" && (
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        )}

        {audioState.isMetadataLoaded ? (
          audioState.isPlaying ? (
            <div
              onClick={pause}
              className="w-4 h-4 rounded-full cursor-pointer"
            >
              <Pause className="w-4 h-4" />
            </div>
          ) : (
            <div
              onClick={play}
              className={cn(
                "w-4 h-4 rounded-full cursor-pointer",
                !audioState.isMetadataLoaded && "opacity-50 cursor-not-allowed"
              )}
            >
              <Play className="w-4 h-4" />
            </div>
          )
        ) : (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
      </div>

      {showProgress ? (
        audioState.isMetadataLoaded ? (
          <div className="w-full" onClick={handleSeek}>
            <div className="h-2 bg-gray-200 rounded-full hover:cursor-pointer">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{
                  width: `${
                    (audioState.currentTime / audioState.duration) * 100
                  }%`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 rounded-full">
              <span>{formatTime(audioState.currentTime)}</span>
              <span>{formatTime(audioState.duration)}</span>
            </div>
          </div>
        ) : (
          <>
            <Skeleton className="w-full h-[30px]" />
          </>
        )
      ) : null}
      <audio
        className="hidden"
        ref={audioRef}
        src={audioLink}
        onTimeUpdate={updateTime}
      />
    </div>
  );
};

export default AudioPlayer;
