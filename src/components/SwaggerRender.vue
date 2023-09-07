<template>
  <div>
    <div id="swagger-ui"></div>
  </div>
</template>

<script>
import '@/assets/swagger/swagger-ui.css'
import '@/assets/swagger/themes/3.x/theme-flattop.css'
import SwaggerUIBundle from '@/assets/swagger/swagger-ui-bundle.js'
import SwaggerUIStandalonePreset from '@/assets/swagger/swagger-ui-standalone-preset.js'

export default {
  props: ['collection'],
  mounted() {
    const ui = SwaggerUIBundle({
      url: this.collection,
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ]
    })

    window.ui = ui
  }
}
</script>