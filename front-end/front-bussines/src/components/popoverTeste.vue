<script setup lang="ts">
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

const date = ref<Date>()

const props = defineProps(['dataTitulo', 'isStart'])
const emit = defineEmits()

const enviaDatas = () => {
  if (props.isStart === 'true') {
    emit('dataInicio', date.value)
  } else {
    emit('dataFim', date.value)

    emit('dataFim', date.value)
  }
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        :variant="'outline'"
        :class="
          cn(
            'w-[220px] justify-start text-left font-normal rounded-lg',
            !date && 'text-muted-foreground'
          )
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <span>{{ date ? format(date, 'PPP') : props.dataTitulo }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar
        class="bg-indigo text-white"
        @click="enviaDatas"
        v-model="date"
      />
    </PopoverContent>
  </Popover>
</template>
