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
import { watch } from 'vue'

const date = ref<Date>()
const props = defineProps(['dataTitulo', 'isStart', 'limparDatas'])
const emit = defineEmits()

const enviaDatas = async () => {
  if (props.isStart === 'true') {
    await emit('dataInicio', date.value)
  } else {
    emit('dataFim', date.value)
  }
  //props do componente pai pra voltar ao estado inicial da variavel após a requisição é isso !
}

const limparData = () => {
  date.value = undefined
}

watch(
  () => props.limparDatas,
  (limpardata) => {
    console.log('limparDatas alterada para:', limpardata)
    if (limpardata === true) {
      limparData()
      emit('limpar-concluido')
    }
  }
)
</script>

<template>
  <Popover class="max-w-10">
    <PopoverTrigger as-child>
      <Button
        :variant="'outline'"
        :class="
          cn(
            'w-[130px] justify-start text-left  text-[12px] text-zinc-400 font-normal rounded-lg bg-zinc-900',
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
        class="bg-zinc-900 text-white"
        @click="enviaDatas"
        v-model="date"
      />
    </PopoverContent>
  </Popover>
</template>
