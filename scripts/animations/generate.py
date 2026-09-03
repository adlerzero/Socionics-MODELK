#!/usr/bin/env python3
"""Generate the three restrained mathematical diagrams used by Model K.

Run from any directory with:

    python3 scripts/animations/generate.py

The GIF palette is restricted to tonal interpolations between #353535 and
#e0e0e0. Each PNG is the complete first frame of its corresponding loop and is
used when the reader prefers reduced motion.
"""

from __future__ import annotations

from pathlib import Path
from typing import Callable

import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Circle, FancyBboxPatch
from PIL import Image


DARK = "#353535"
LIGHT = "#e0e0e0"
ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "assets" / "animations"
WIDTH, HEIGHT = 900, 506
FRAME_DURATION_MS = 140


def smoothstep(value: float) -> float:
    value = float(np.clip(value, 0.0, 1.0))
    return value * value * (3.0 - 2.0 * value)


def full_then_rebuild(frame: int, total: int) -> float:
    """Begin and end fully composed so the first frame is a useful fallback."""
    if frame < 7:
        return 1.0
    if frame < 13:
        return 1.0 - smoothstep((frame - 7) / 6)
    if frame < total - 9:
        return smoothstep((frame - 13) / (total - 22))
    return 1.0


def canvas():
    fig, ax = plt.subplots(figsize=(WIDTH / 100, HEIGHT / 100), dpi=100)
    fig.patch.set_facecolor(DARK)
    ax.set_facecolor(DARK)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    fig.subplots_adjust(0, 0, 1, 1)
    return fig, ax


def label(ax, x, y, text, *, size=13, alpha=1.0, align="center", weight="normal"):
    return ax.text(
        x,
        y,
        text,
        color=LIGHT,
        alpha=alpha,
        fontsize=size,
        fontfamily="DejaVu Sans Mono",
        fontweight=weight,
        ha=align,
        va="center",
    )


def panel(ax, center, width, height, alpha):
    x, y = center
    patch = FancyBboxPatch(
        (x - width / 2, y - height / 2),
        width,
        height,
        boxstyle="round,pad=0.014,rounding_size=0.012",
        facecolor=DARK,
        edgecolor=LIGHT,
        linewidth=1.2,
        alpha=alpha,
    )
    ax.add_patch(patch)
    return patch


def draw_object_descriptions(frame: int, total: int):
    fig, ax = canvas()
    progress = full_then_rebuild(frame, total)
    path_progress = smoothstep(progress * 1.35)
    detail_alpha = smoothstep((progress - 0.28) / 0.72)

    label(ax, 0.5, 0.91, "SAME REFERENT  ≠  SAME THEORETICAL DESCRIPTION", size=20, weight="bold")
    label(ax, 0.5, 0.82, "σ = σ′", size=22)

    ax.add_patch(Circle((0.5, 0.53), 0.09, facecolor=DARK, edgecolor=LIGHT, linewidth=1.5))
    label(ax, 0.5, 0.53, "σ", size=34, weight="bold")
    label(ax, 0.5, 0.42, "one object", size=13, alpha=0.55)

    left_end = np.array([0.25, 0.53])
    right_end = np.array([0.75, 0.53])
    origin_left = np.array([0.405, 0.53])
    origin_right = np.array([0.595, 0.53])
    left_now = origin_left + (left_end + np.array([0.10, 0.0]) - origin_left) * path_progress
    right_now = origin_right + (right_end - np.array([0.10, 0.0]) - origin_right) * path_progress
    ax.plot([origin_left[0], left_now[0]], [0.53, left_now[1]], color=LIGHT, alpha=0.68 * progress, linewidth=1.4)
    ax.plot([origin_right[0], right_now[0]], [0.53, right_now[1]], color=LIGHT, alpha=0.68 * progress, linewidth=1.4)

    if progress > 0.05:
        panel(ax, (0.20, 0.53), 0.25, 0.24, 0.75 * detail_alpha)
        panel(ax, (0.80, 0.53), 0.25, 0.24, 0.75 * detail_alpha)
        label(ax, 0.20, 0.60, "D_F(σ)", size=22, alpha=detail_alpha, weight="bold")
        label(ax, 0.20, 0.51, "aspect / relations A", size=12, alpha=0.58 * detail_alpha)
        label(ax, 0.80, 0.60, "D_λ(σ)", size=22, alpha=detail_alpha, weight="bold")
        label(ax, 0.80, 0.51, "aspect / relations A′", size=12, alpha=0.58 * detail_alpha)
        label(ax, 0.20, 0.44, "theory F", size=12, alpha=0.42 * detail_alpha)
        label(ax, 0.80, 0.44, "theory λ", size=12, alpha=0.42 * detail_alpha)

    label(ax, 0.5, 0.19, "D_F(σ)  ≠  D_λ(σ)", size=25, alpha=max(0.12, detail_alpha), weight="bold")
    label(ax, 0.5, 0.10, "descriptive difference does not divide the referent", size=14, alpha=0.52)
    return fig


def draw_correlation_transformation(frame: int, total: int):
    fig, ax = canvas()
    progress = full_then_rebuild(frame, total)
    connection = smoothstep(progress * 1.25)
    result_alpha = smoothstep((progress - 0.36) / 0.64)

    label(ax, 0.5, 0.91, "POSSIBLE PAIRING DOES NOT PERFORM A MODIFICATION", size=20, weight="bold")
    label(ax, 0.17, 0.79, "F", size=22, weight="bold")
    label(ax, 0.83, 0.79, "λ", size=22, weight="bold")

    left_labels = ["f₁", "fᵢⱼ", "f₃"]
    right_labels = ["λ₁", "λₖ", "λ₃"]
    ys = [0.66, 0.52, 0.38]
    for item, y in zip(left_labels, ys):
        ax.add_patch(Circle((0.17, y), 0.041, facecolor=DARK, edgecolor=LIGHT, linewidth=1.1, alpha=0.72))
        label(ax, 0.17, y, item, size=16, alpha=0.82)
    for item, y in zip(right_labels, ys):
        ax.add_patch(Circle((0.83, y), 0.041, facecolor=DARK, edgecolor=LIGHT, linewidth=1.1, alpha=0.72))
        label(ax, 0.83, y, item, size=16, alpha=0.82)

    left_start = 0.215
    right_start = 0.785
    left_now = left_start + (0.405 - left_start) * connection
    right_now = right_start - (right_start - 0.595) * connection
    ax.plot([left_start, left_now], [0.52, 0.52], color=LIGHT, linewidth=1.4, alpha=0.72 * progress)
    ax.plot([right_start, right_now], [0.52, 0.52], color=LIGHT, linewidth=1.4, alpha=0.72 * progress)

    panel(ax, (0.5, 0.52), 0.19, 0.14, 0.75 * result_alpha)
    label(ax, 0.5, 0.55, "(fᵢⱼ, λₖ)", size=18, alpha=result_alpha, weight="bold")
    label(ax, 0.5, 0.48, "∈ F × λ", size=15, alpha=0.62 * result_alpha)

    label(ax, 0.5, 0.25, "F × λ   ⇏   Λ(F) ≠ F", size=24, alpha=max(0.12, result_alpha), weight="bold")
    label(ax, 0.5, 0.14, "association", size=13, alpha=0.55, align="right")
    label(ax, 0.525, 0.14, "≠", size=16, alpha=0.75)
    label(ax, 0.55, 0.14, "transformation", size=13, alpha=0.55, align="left")
    return fig


def convergence_progress(frame: int, total: int) -> float:
    if frame < 7:
        return 1.0
    if frame < 13:
        return 1.0 - smoothstep((frame - 7) / 6)
    if frame < total - 7:
        return smoothstep((frame - 13) / (total - 20))
    return 1.0


def draw_hypothesis_convergence(frame: int, total: int):
    fig, ax = canvas()
    progress = convergence_progress(frame, total)
    stage = progress * 5.0
    x = np.linspace(0.12, 0.88, 6)
    paths = np.array(
        [
            [0.42, 0.50, 0.47, 0.61, 0.66, 0.72],
            [0.42, 0.30, 0.23, 0.18, 0.14, 0.11],
            [0.42, 0.53, 0.69, 0.78, 0.83, 0.87],
            [0.42, 0.46, 0.42, 0.34, 0.29, 0.25],
            [0.42, 0.49, 0.52, 0.59, 0.51, 0.45],
            [0.42, 0.51, 0.46, 0.60, 0.69, 0.58],
        ]
    )
    eliminated_at = [99, 1, 2, 3, 4, 5]

    label(ax, 0.5, 0.91, "SUCCESSIVE OBSERVATIONS RESTRICT ADMISSIBLE HYPOTHESES", size=18, weight="bold")
    label(ax, 0.08, 0.79, "H", size=15, alpha=0.52)
    label(ax, 0.92, 0.79, "interpretations", size=13, alpha=0.45, align="right")

    for index, (path, elimination) in enumerate(zip(paths, eliminated_at)):
        if index == 0:
            alpha = 0.94
            width = 2.2
        else:
            fade = smoothstep(stage - elimination + 0.35)
            alpha = 0.50 * (1 - fade) + 0.07 * fade
            width = 1.25
        ax.plot(x, path, color=LIGHT, alpha=alpha, linewidth=width)

    observation_stage = int(np.floor(stage + 0.001))
    for index in range(6):
        visible = smoothstep(stage - index + 0.85)
        ax.plot(x[index], paths[0, index], marker="o", markersize=6.5, markerfacecolor=DARK, markeredgecolor=LIGHT, alpha=visible)
        label(ax, x[index], 0.22, f"o{index + 1}", size=13, alpha=0.35 + 0.45 * visible)
        ax.plot([x[index], x[index]], [0.27, 0.77], color=LIGHT, linewidth=0.65, alpha=0.07 + 0.10 * visible)

    admissible = max(1, 6 - min(observation_stage, 5))
    label(ax, 0.5, 0.12, f"admissible hypotheses: {admissible}", size=18, alpha=0.72, weight="bold")
    return fig


def palette_image() -> Image.Image:
    dark = np.array([53, 53, 53], dtype=float)
    light = np.array([224, 224, 224], dtype=float)
    colors = []
    for value in np.linspace(0, 1, 16):
        colors.extend(np.rint(dark + (light - dark) * value).astype(int).tolist())
    colors.extend([53, 53, 53] * (256 - 16))
    image = Image.new("P", (1, 1))
    image.putpalette(colors)
    return image


def render(name: str, draw: Callable[[int, int], object], frame_count: int) -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    frames: list[Image.Image] = []
    palette = palette_image()

    for frame_number in range(frame_count):
        fig = draw(frame_number, frame_count)
        fig.canvas.draw()
        rgba = np.asarray(fig.canvas.buffer_rgba())
        rgb = Image.fromarray(rgba, "RGBA").convert("RGB")
        if frame_number == 0:
            rgb.save(OUTPUT / f"{name}-static.png", optimize=True)
        indexed = rgb.quantize(palette=palette, dither=Image.Dither.NONE)
        frames.append(indexed)
        plt.close(fig)

    frames[0].save(
        OUTPUT / f"{name}.gif",
        save_all=True,
        append_images=frames[1:],
        duration=FRAME_DURATION_MS,
        loop=0,
        optimize=True,
        disposal=1,
    )

    gif_size = (OUTPUT / f"{name}.gif").stat().st_size / 1024
    png_size = (OUTPUT / f"{name}-static.png").stat().st_size / 1024
    seconds = frame_count * FRAME_DURATION_MS / 1000
    print(f"{name}: {seconds:.1f}s, GIF {gif_size:.0f} KiB, PNG {png_size:.0f} KiB")


def main() -> None:
    render("object-descriptions", draw_object_descriptions, 48)
    render("correlation-transformation", draw_correlation_transformation, 48)
    render("hypothesis-convergence", draw_hypothesis_convergence, 52)


if __name__ == "__main__":
    main()
