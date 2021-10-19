<template>
  <div id="contract">
    <div class="q-pa-md">
      <div class="text-h4 xs-text-h4">
        Расчёты стоимости  <q-chip clickable icon="call_merge" color="orange" text-color="white" @click="dialog.calculation = true" style="display: none">Рассчитать стоимость</q-chip>
      </div>
    </div>
    <q-item clickable v-ripple @click="$refs.doc.open($event, '/statics/Elena.pdf')">
       <q-item-section avatar>
         <q-avatar color="primary" text-color="white">
           <q-icon name="file_copy"></q-icon>
         </q-avatar>
       </q-item-section>
       <q-item-section>
         <q-item-label>Пример расчёта стоимости дома под ключ</q-item-label>
         <q-item-label class="text-bold">Проект "Елена"</q-item-label>
       </q-item-section>
       <q-item-section side class="gt-xs">
         <q-btn unelevated rounded size="11px" color="green" label="согласовать" disabled></q-btn>
      </q-item-section>
       <q-item-section side class="gt-xs">
         <q-btn unelevated rounded size="11px" color="grey" label="Отклонить" disabled></q-btn>
      </q-item-section>
       <q-item-section side nopen class="touch-hide">
         <q-btn flat round dense nopen>
           <q-icon name="more_vert" nopen/>
           <q-menu
              transition-show="scale"
              transition-hide="scale"
              nopen
              nbg
            >
              <q-item-section side class="q-pa-xs" @click="$refs.doc.print('/statics/Elena.pdf')" nopen>
                <q-btn round color="green" icon="print" nopen></q-btn>
              </q-item-section>

              <q-item-section side class="q-pa-xs" @click="$refs.doc.open($event, '/statics/Elena.pdf')">
                <q-btn round color="grey" icon="visibility"></q-btn>
              </q-item-section>
            </q-menu>
         </q-btn>
       </q-item-section>
     </q-item>
      <q-item class="lt-sm">
        <q-item-section side>
          <q-btn unelevated rounded size="11px" color="green" label="согласовать" disabled></q-btn>
       </q-item-section>
        <q-item-section side>
          <q-btn unelevated rounded size="11px" color="grey" label="Отклонить" disabled></q-btn>
       </q-item-section>
      </q-item>
      <printdoc ref="doc"></printdoc>

      <q-dialog v-model="dialog.calculation">
        <q-card style="width: 100%; max-width: 620px;">
          <q-card-section>
            <div class="text-h6">Загрузить на расчёт</div>
          </q-card-section>

          <q-separator ></q-separator>

            <q-stepper
              v-model="calculation.step"
              vertical
              color="light-blue-11"
              animated
            >
              <q-step
                :name="1"
                title="Ссылка на проект"
                icon="settings"
                :done="calculation.step > 1"
              >
                <q-input filled v-model="calculation.url" placeholder="Ссылка" hint="*Не обязательное поле" ></q-input>

                <q-stepper-navigation>
                  <q-btn @click="calculation.step = 2" color="light-blue-7" label="Далее" ></q-btn>
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="2"
                title="Ваш комментарий"
                icon="comment"
                :done="calculation.step > 2"
              >
                <q-input
                  v-model="calculation.comment"
                  filled
                  type="textarea"
                ></q-input>

                <q-stepper-navigation>
                  <q-btn @click="calculation.step = 3" color="light-blue-7" label="Далее" ></q-btn>
                  <q-btn flat @click="calculation.step = 1" color="primary" label="Назад" class="q-ml-sm" ></q-btn>
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="3"
                title="Прикрепите файлы"
                icon="assignment"
              >
              <q-uploader
                :url="'https://api.vevanta.ru/users/upload/' + $store.state.auth.user.id"
                :headers="[{ name: 'token', value: $store.state.auth.token }]"
                label="Custom header"
                accept="image/*"
                class="full-width"
              >
                <template v-slot:header="scope">
                  <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                    <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
                      <q-tooltip>Удалить изображение</q-tooltip>
                    </q-btn>
                    <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" ></q-spinner>
                    <div class="col">
                      <div class="q-uploader__title">Выберите изображение (макс 2 МБ) </div>
                      <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}</div>
                    </div>
                    <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
                      <q-uploader-add-trigger id="prevImgLoad"></q-uploader-add-trigger>
                      <q-tooltip>Добавить изображение</q-tooltip>
                    </q-btn>
                    <q-btn v-if="scope.canUpload" icon="cloud_upload" @click="scope.upload" round dense flat>
                      <q-tooltip>Загрузить</q-tooltip>
                    </q-btn>

                    <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat>
                      <q-tooltip>Abort Upload</q-tooltip>
                    </q-btn>
                  </div>
                </template>
              </q-uploader>

              <q-stepper-navigation>
                <q-btn @click="calculation.step = 4" color="light-blue-7" label="Далее" ></q-btn>
                <q-btn flat @click="calculation.step = 2" color="primary" label="Назад" class="q-ml-sm" ></q-btn>
              </q-stepper-navigation>
              </q-step>

              <q-step
                :name="4"
                title="Create an ad"
                icon="add_comment"
              >
                Try out different ad text to see what brings in the most customers, and learn how to
                enhance your ads using features like ad extensions. If you run into any problems with
                your ads, find out how to tell if they're running and how to resolve approval issues.

                <q-stepper-navigation>
                  <q-btn color="primary" label="Finish" ></q-btn>
                  <q-btn flat @click="calculation.step = 2" color="primary" label="Back" class="q-ml-sm" ></q-btn>
                </q-stepper-navigation>
              </q-step>
            </q-stepper>

        </q-card>
      </q-dialog>
  </div>
</template>

<script>
import printdoc from 'components/printdoc/index.vue'
export default {
  name: 'contract',
  components: {
    printdoc
  },

  data () {
    return {
      calculation: {
        step: 1,
        url: '',
        comment: ''
      },
      dialog: {
        calculation: false
      }
    }
  },

  created () {
    this.$store.dispatch('user/GET_OFFERS')
  },

  methods: {
  }
}
</script>

<style>
[nbg]{
  background: transparent;
  box-shadow: none;
}
</style>
