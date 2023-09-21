<script setup lang="ts">
import { computed, useSlots } from "vue";
import RouteModel from "@/modules/Base/models/RouteModel";
import BaseIcon from "@/modules/Base/components/BaseIcon.vue";

const slots = useSlots();

type ButtonSubtype = "default" | "text";
type ButtonSize = "large" | "medium" | "small";
type BaseButtonType = "primary" | "secondary" | "transparent" | "circle" | "white";

const props = withDefaults(
  defineProps<{
    route?: RouteModel;
    type?: BaseButtonType;
    subtype?: ButtonSubtype;
    size?: ButtonSize;
    icon?: string;
    iconSize?: number;
    isEmphasised?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    isFullWidth?: boolean;
    isOnlyIcon?: boolean;
    isError?: boolean;
    isCheck?: boolean;
  }>(),
  {
    type: "primary",
    subtype: "default",
    size: "medium",
  }
);

const iconSize = computed<number>(() => {
  if (props.iconSize) {
    return props.iconSize;
  }

  if (props.subtype === "text" && props.size === "medium") {
    return 16;
  }

  return 20;
});

const classes = computed<object>(() => {
  return {
    [`base-button_type_${props.type}`]: props.type,
    [`base-button_subtype_${props.subtype}`]: props.subtype,
    [`base-button_size_${props.size}`]: props.size,
    "base-button_icon-only": !slots.default || props.isOnlyIcon,
    "base-button_loading": props.isLoading,
    "base-button_disabled": props.isDisabled,
    "base-button_with-icon": props.icon,
    "base-button_full-width": props.isFullWidth,
    "base-button_error": props.isError,
    "base-button_check": props.isCheck,
  };
});
</script>

<template>
  <component
    :is="route ? 'router-link' : 'button'"
    :to="route"
    :target="route?.blank || false"
    class="base-button"
    :class="classes"
    :disabled="isDisabled || isLoading"
    @keydown.space.prevent
  >
    <BaseIcon v-if="icon && !isLoading" class="base-button__icon" :name="icon" :size="iconSize" />
    <BaseIcon v-if="isLoading" class="base-button__icon base-button__icon_loader" :size="iconSize" name="loader" />
    <span v-if="!!$slots.default && !isOnlyIcon" class="base-button__text">
      <slot></slot>
    </span>
  </component>
</template>

<style lang="scss">
.base-button {
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  transition: background-color $trs-back, color $trs-back;

  &:not(.base-button_full-width) {
    .base-button__text {
      flex-grow: 1;
    }
  }

  &:not(.base-button_icon-only) {
    .base-button__icon {
      margin-right: 8px;
    }
  }

  & > * {
    pointer-events: none;
  }

  &__text {
    white-space: nowrap;
  }

  &_type {
    &_primary {
      &.base-button {
        min-width: 166px;

        &_subtype {
          &_default {
            min-width: 166px;
            color: $white-100;
            border-radius: $border-radius-md;
            background: $purple-200;

            .base-button__icon_loader {
              svg {
                fill: $white-100;
              }
            }

            &.base-button {
              &_size {
                &_large {
                  @include label-16;

                  padding: 13px 38px;

                  &.base-button_icon-only {
                    padding: 14px;
                  }
                }

                &_medium {
                  @include label-14;

                  padding: 10px 30px;

                  &.base-button_icon-only {
                    padding: 10px;
                  }
                }

                &_small {
                  @include label-14;

                  padding: 10px 26px;

                  &.base-button_icon-only {
                    padding: 10px;
                  }
                }
              }
            }
          }

          &_text {
            color: $gray-600;
            background-color: transparent;

            &.base-button {
              &_size {
                &_large {
                  @include label-16;
                }

                &_medium {
                  @include label-14;
                }

                &_small {
                  @include label-14;
                }
              }
            }
          }
        }
      }
    }

    &_secondary {
      &.base-button {
        min-width: 166px;

        &_subtype {
          &_default {
            color: $white-100;
            background-color: $gray-850;
            border-radius: $border-radius-md;

            .base-button__icon_loader {
              svg {
                fill: $gray-600;
              }
            }

            &.base-button {
              &_size {
                &_large {
                  @include label-16;

                  padding: 13px 38px;

                  &.base-button_icon-only {
                    padding: 14px;
                  }
                }

                &_medium {
                  @include label-14;

                  padding: 10px 30px;

                  &.base-button_icon-only {
                    padding: 10px;
                  }
                }

                &_small {
                  @include label-14;

                  padding: 10px 26px;

                  &.base-button_icon-only {
                    padding: 10px;
                  }
                }
              }
            }
          }

          &_text {
            color: $gray-500;
            background-color: transparent;

            &.base-button {
              &_size {
                &_large {
                  @include label-16;
                }

                &_medium {
                  @include label-14;
                }

                &_small {
                  @include label-14;
                }
              }
            }
          }
        }
      }
    }

    &_white {
      &.base-button {
        min-width: 166px;

        &_subtype {
          &_default {
            color: $purple-100;
            background-color: $white-100;
            border-radius: $border-radius-md;

            .base-button__icon_loader {
              svg {
                fill: $gray-600;
              }
            }

            &.base-button {
              &_size {
                &_large {
                  @include label-16;

                  padding: 13px 38px;

                  &.base-button_icon-only {
                    padding: 14px;
                  }
                }

                &_medium {
                  @include label-14;

                  padding: 10px 30px;

                  &.base-button_icon-only {
                    padding: 10px;
                  }
                }

                &_small {
                  @include label-14;

                  padding: 10px 26px;

                  &.base-button_icon-only {
                    padding: 10px;
                  }
                }
              }
            }
          }

          &_text {
            color: $purple-100;
            background-color: transparent;

            &.base-button {
              &_size {
                &_large {
                  @include label-16;
                }

                &_medium {
                  @include label-14;
                }

                &_small {
                  @include label-14;
                }
              }
            }
          }
        }
      }
    }

    &_transparent {
      background-color: transparent;

      &.base-button {
        background-color: transparent;
      }
    }

    &_circle {
      &.base-button {
        color: $white-100;
        background-color: $gray-850;
        border-radius: 100%;
        backdrop-filter: blur(16px);

        &_size {
          &_large {
            width: 32px;
            height: 32px;
          }

          &_medium {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }

  &_loading {
    pointer-events: none;
  }

  &_loading,
  &_with-icon {
    &.base-button_type_primary {
      &.base-button {
        &_subtype {
          &_default {
            &.base-button {
              &_size {
                &_large {
                  padding: 13px 2.4px;

                  &.base-button_icon-only {
                    padding: 14px;
                  }
                }

                &_medium {
                  padding: 10px 16px;

                  &.base-button_icon-only {
                    padding: 10px;
                  }
                }

                &_small {
                  padding: 10px 16px;

                  &.base-button_icon-only {
                    padding: 10px;
                  }
                }
              }
            }
          }
        }
      }
    }

    &.base-button_type_secondary {
      &.base-button {
        &_subtype {
          &_default {
            &.base-button {
              &_size {
                &_large {
                  padding: 13px 2.4px;

                  &.base-button_icon-only {
                    padding: 14px;
                  }
                }

                &_medium {
                  padding: 10px 16px;

                  &.base-button_icon-only {
                    padding: 10px;
                  }
                }

                &_small {
                  padding: 10px 16px;

                  &.base-button_icon-only {
                    padding: 10px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  &_disabled {
    pointer-events: none;

    &:not(.base-button_subtype_text) {
      color: $gray-500 !important;
    }

    &:not(.base-button_type_transparent),
    &:not(.base-button_subtype_text) {
      background-color: $gray-200 !important;
    }

    &.base-button_type_transparent,
    &.base-button_subtype_text {
      background-color: transparent !important;
    }
  }

  &_full-width {
    width: 100%;
  }

  &_error {
    color: $red-100 !important;
  }
}
</style>
