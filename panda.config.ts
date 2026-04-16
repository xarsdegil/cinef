import { amber } from "@/theme/colors/amber";
import { green } from "@/theme/colors/green";
import { red } from "@/theme/colors/red";
import { slate } from "@/theme/colors/slate";
import { animationStyles } from "@/theme/animation-styles";
import { conditions } from "@/theme/conditions";
import { globalCss } from "@/theme/global-css";
import { keyframes } from "@/theme/keyframes";
import { layerStyles } from "@/theme/layer-styles";
import { slotRecipes, recipes } from "@/theme/recipes";
import { textStyles } from "@/theme/text-styles";
import { colors } from "@/theme/tokens/colors";
import { durations } from "@/theme/tokens/durations";
import { shadows } from "@/theme/tokens/shadows";
import { zIndex } from "@/theme/tokens/z-index";
import { defineConfig } from "@pandacss/dev";
import type { PandaPlugin, PresetResolvedHookArgs } from "@pandacss/types";

const removePandaPresetColors: PandaPlugin = {
  name: "Remove Panda Preset Colors",
  hooks: {
    "preset:resolved": ({ utils, preset, name }: PresetResolvedHookArgs) =>
      name === "@pandacss/preset-panda"
        ? utils.omit(preset, ["theme.tokens.colors", "theme.semanticTokens.colors"])
        : preset,
  },
};

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{ts,tsx,js,jsx}"],
  exclude: [],
  jsxFramework: "react",
  outdir: "styled-system",
  plugins: [removePandaPresetColors],

  theme: {
    extend: {
      semanticTokens: {
        radii: {
          l1: { value: "{radii.xs}" },
          l2: { value: "{radii.sm}" },
          l3: { value: "{radii.md}" },
        },

        colors: {
          bg: {
            canvas: {
              value: {
                _light: "{colors.gray.1}",
                _dark: "{colors.gray.2}"
              }
            },

            panel: {
              value: {
                _light: "{colors.gray.2}",
                _dark: "{colors.gray.3}"
              }
            },

            panelElevated: {
              value: {
                _light: "{colors.gray.3}",
                _dark: "{colors.gray.4}"
              }
            }
          },

          fg: {
            default: {
              value: {
                _light: "{colors.gray.12}",
                _dark: "{colors.gray.12}"
              }
            },

            muted: {
              value: {
                _light: "{colors.gray.11}",
                _dark: "{colors.gray.11}"
              }
            },

            subtle: {
              value: {
                _light: "{colors.gray.10}",
                _dark: "{colors.gray.10}"
              }
            }
          },

          border: {
            value: {
              _light: "{colors.gray.4}",
              _dark: "{colors.gray.4}"
            }
          },

          borderStrong: {
            value: {
              _light: "{colors.gray.6}",
              _dark: "{colors.gray.6}"
            }
          },

          error: {
            value: {
              _light: "{colors.red.9}",
              _dark: "{colors.red.9}"
            }
          },

          amber: amber,
          gray: slate,
          red: red,
          green: green
        },

        shadows: shadows
      },

      animationStyles: animationStyles,
      recipes: recipes,
      slotRecipes: slotRecipes,
      keyframes: keyframes,
      layerStyles: layerStyles,
      textStyles: textStyles,

      tokens: {
        colors: colors,
        durations: durations,
        zIndex: zIndex
      }
    },
  },

  globalCss: globalCss,
  conditions: conditions
});
