<script setup lang="ts">
import { ref, computed, onMounted, inject, watch } from "vue";
import Service from "@/service";
import BaseScore from "@/modules/Base/components/BaseScore.vue";
import BaseIcon from "@/modules/Base/components/BaseIcon.vue";
import BaseButton from "@/modules/Base/components/BaseButton.vue";
import { TaskModel } from "@/modules/Tasks/models/TaskModel";
import { useUserStore } from "@/modules/Profile/stores/UserStore";
import { durationFormatter } from "@/utils/durationFormatter";
import { EModalTypes } from "@/modules/Base/components/BaseModal/EModalTypes.enum";
import { UserTaskStatusType } from "@/modules/Tasks/models/TaskModel";

const emit = defineEmits<{
  (e: "completed"): void;
}>();

const emitter: any = inject("emitter");

const $userStore = useUserStore();

const props = withDefaults(
  defineProps<{
    model: TaskModel;
  }>(),
  { model: () => new TaskModel() }
);

const isLoading = ref(false);
const currentRemainingSeconds = ref<number>(props.model.remainingSeconds || 0);
const currentUserTaskStatus = ref<UserTaskStatusType>(props.model.userTaskStatus);
const wasWandUsed = ref<boolean>(false);
const timer = ref();

const classes = computed(() => {
  return {
    "task-card_hidden": props.model.taskStatus === "block",
  };
});

const currentFormattedRemainingSeconds = computed<string>(() => {
  return durationFormatter(currentRemainingSeconds.value);
});

const isTaskReady = computed<boolean>(() => {
  return (
    (props.model.taskStatus === "active" || props.model.taskStatus === "active_not_check") && currentUserTaskStatus.value === null
  );
});

const isNoCheckTaskProcessing = computed<boolean>(() => {
  return (
    ["active_processing", "active_not_check"].includes(props.model.taskStatus) && currentUserTaskStatus.value === "processing"
  );
});

const isNoCheckTaskFailed = computed<boolean>(() => {
  return props.model.taskStatus === "active_not_check" && currentUserTaskStatus.value === "fail";
});

const canCheckTask = computed<boolean>(() => {
  return props.model.taskStatus === "active" && currentUserTaskStatus.value === "processing";
});

const isFailedCheckTask = computed<boolean>(() => {
  return ["active", "active_not_check"].includes(props.model.taskStatus) && currentUserTaskStatus.value === "fail";
});

const isDoneTask = computed<boolean>(() => {
  return (
    ["active", "active_processing", "active_check", "active_not_check", "active_info"].includes(props.model.taskStatus) &&
    currentUserTaskStatus.value === "done"
  );
});

const isLoseTask = computed<boolean>(() => {
  return (
    ["active_processing", "active_check", "active_not_check"].includes(props.model.taskStatus) &&
    currentUserTaskStatus.value === "lose"
  );
});

const isTimeoverTask = computed<boolean>(() => {
  return currentUserTaskStatus.value === "time over";
});

const isTaskChecking = computed<boolean>(() => {
  return props.model.taskStatus === "active_check" && currentUserTaskStatus.value === "processing";
});

const isExamTask = computed<boolean>(() => {
  return props.model.taskStatus === "active_info";
});

const isTimerShown = computed<boolean>(() => {
  return !!currentRemainingSeconds.value && !isTimeoverTask.value && !isDoneTask.value && !isExamTask.value;
});

const showWandModal = () => {
  if ($userStore.user?.magicWandCount && !props.model.useExtraTime && !wasWandUsed.value) {
    emitter.emit("openModal", { type: EModalTypes.WAND, props: { taskAlias: props.model.alias } });
  }
};

const startTask = async (): Promise<void> => {
  const response = await Service.tasks.startTask(props.model.alias);

  if (response.result) {
    currentUserTaskStatus.value = "processing";
    currentRemainingSeconds.value = response.result.remainingSeconds || 0;

    if (response.result.remainingSeconds) {
      timer.value = setInterval(() => {
        currentRemainingSeconds.value--;
      }, 1000);
    }
  }

  if ($userStore.user?.deluminatorCount && props.model.useDeluminator) {
    emitter.emit("openModal", { type: EModalTypes.DELUMINATOR, props: { taskAlias: props.model.alias } });
  }
};

const checkTask = async (): Promise<void> => {
  isLoading.value = true;

  const response = await Service.tasks.checkTask(props.model.alias);

  if (response.result) {
    currentUserTaskStatus.value = response.result.status;

    if (response.result.status === "done" && $userStore.user?.points) {
      $userStore.user.points += props.model.points;

      emit("completed");
    }
  }

  isLoading.value = false;
};

onMounted(() => {
  if (props.model.remainingSeconds) {
    timer.value = setInterval(() => {
      currentRemainingSeconds.value--;
    }, 1000);
  }

  if (props.model.taskStatus === "active" && currentUserTaskStatus.value === "fail") {
    currentUserTaskStatus.value = "processing";
  }
});

watch(
  () => currentRemainingSeconds.value,
  (newValue) => {
    if (newValue === 0) {
      clearInterval(timer.value);
      timer.value = null;
    }
  }
);

emitter.on("useDeluminator", async (payload) => {
  if (payload.taskAlias === props.model.alias) {
    currentUserTaskStatus.value = "done";
    emit("completed");
  }
});

emitter.on("useWand", async (payload) => {
  if (payload.taskAlias === props.model.alias) {
    currentRemainingSeconds.value = payload.currentTime;

    wasWandUsed.value = true;

    if (!timer.value) {
      timer.value = setInterval(() => {
        currentRemainingSeconds.value--;
      }, 1000);
    }
  }
});
</script>

<template>
  <div class="task-card" :class="classes">
    <div class="task-card__title">{{ model.title }}</div>
    <div class="task-card__description">
      {{ model.description }}
    </div>

    <button v-if="isTimerShown" class="task-card__timer" type="button" @click="showWandModal">
      <BaseIcon name="timer" class="task-card__timer-icon" />
      {{ currentFormattedRemainingSeconds }}
    </button>

    <template v-if="!isExamTask">
      <BaseButton v-if="isTaskReady" class="task-card__button" size="small" @click="startTask">Выполнить</BaseButton>

      <BaseButton v-if="isNoCheckTaskProcessing" class="task-card__button" size="small" type="secondary">Выполняется</BaseButton>

      <BaseButton v-if="canCheckTask" class="task-card__button" type="white" size="small" @click="checkTask">
        Проверить
      </BaseButton>

      <BaseButton v-if="isTaskChecking" class="task-card__button" size="small" type="secondary">На проверке</BaseButton>

      <template v-if="isFailedCheckTask">
        <BaseButton class="task-card__button" type="secondary" size="small" is-error>Не все условия выполнены</BaseButton>

        <BaseButton
          v-if="currentRemainingSeconds"
          class="task-card__button"
          size="small"
          type="white"
          @click="checkTask"
          :is-loading="isLoading"
          >Проверить</BaseButton
        >
      </template>

      <BaseButton
        v-if="isLoseTask || isTimeoverTask || isNoCheckTaskFailed"
        class="task-card__button"
        type="secondary"
        size="small"
        is-error
        >Задание не выполнено</BaseButton
      >
    </template>

    <div v-if="isDoneTask" class="task-card__done">
      <BaseIcon name="done" />
    </div>

    <div v-if="!isLoseTask && !isDoneTask" class="task-card__reward">
      <BaseScore :count="+model.points" icon="coin" />
    </div>
  </div>
</template>

<style lang="scss">
.task-card {
  position: relative;
  padding: 12px 78px 12px 12px;
  border-radius: $border-radius-md;
  background-color: $black-100;

  &__title {
    @include body-16;
    color: $gray-100;
  }

  &__description {
    @include body-14;
    margin-top: 4px;
    color: $gray-600;
  }

  &__button {
    margin-top: 12px;
  }

  &__reward {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 2px 4px 2px 8px;
    border-radius: 40px;
    background: $purple-200;
  }

  &__done {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 4px;
    border-radius: 50%;
    background-color: $green-200;
  }

  &__timer {
    @include label-14;
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 80px;
    padding: 4px 8px;
    background-color: $gray-850;
    color: $gray-100;
    border-radius: $border-radius-sm;
  }

  &__timer-icon {
    color: $gray-600;
  }

  &_hidden {
    filter: blur(2.5px);
  }
}
</style>
