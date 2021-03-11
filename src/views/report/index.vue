<template>
  <div class="powerbi">
    <div id="container" class="powerbi-box"/>
  </div>
</template>

<script>

import * as pbi from 'powerbi-client';

export default {
  name: 'PowerBI',
  mounted() {
    this.renderBi()
  },
  methods: {
    renderBi() {
      var permissions = pbi.models.Permissions.All
      var config = {
        type: 'report',
        tokenType: pbi.models.TokenType.Embed,
        accessToken: 'H4sIAAAAAAAEAB2Wta7FjLWE3-VvHclMkVKYmdmdGbaZ7ei--z1KP8XSp5k1899_7Owd5qz859__vIPTIIDwUNka-tFeZIVrTBWC4hIJ592OG-YPd_wIqQ532mLrfrXaZl4IVaQahkfLEl9Dibv5yseXrYm2SexzryaPMdarDiRW9H5o-EPJJJTnrzwe4-A97zmo4ptzViif14iDPS4n2hBzySZXJ00YU3uq1a7W2SWzMID7NKydEjGjUxuxm9PyOFJOyagnHzw_bPlpXCQkwD5TTqUsvyjqPv5AdC_ep2zqfHMdf5crVg8i3ECtccZplb0zNlbQ7X3xi649Cz9s88oa1lMk8N4Wu7xK73FXTgVat1z5bgk8K5wCTWC3AjXF9dPFetPR9IqFDeNPd_VqPa-eiTaJ7mJD7vsbZHvvhhhVRjDj5bTkcg9FT6DGDLSiQNpq037hlo-M0ehVQScro1juPe0OUCvz-cWnZnXjQyscCh17txznHYkV_RaePzoZ-mxPMaDzSNfnutIAA4ZtI_n9q-LGGixnbtjpvpuZprwY41HIRtFqxQFBe-dToo-X-EHzmOehRRK4ytj25ploJw_CzwVjL7U3FD1N_-ZZkhgk0W_1M0rXncyuZuhcjQMf4kT6ZiHa8DMc2P7FkGJNqrnjg2vKhOu43TZicY6RyhtuQe7pgo-JdgC8XNs6x6b0lpu8DQibIlfL18521ttZ_J8fw13Yigdozu_gi_qZBIs0tySN1qQJ74OwYrY18aeQphC7-NLm3iAxMIPkjTmIAcAngxBStC5Oy_18RdvxYbpFCS-iUG8DgeWLkp-HB_QFxn4ppY-iKx8Uu1lH6VoyyAXFJT0BFyaIGJSQYRZLT2VtmR4aycZ7F2Pj9COkP7YkmsEkh0OoBdjrgAbg5QJD87DbIrp_jrreXmSYW1YMxhQCsVlXiuIhGiGIjtJsf8lbVjq30lGMQhkrXIntD7J6HVBtReaQynY4VL8UzzxsnL6HFkyj2vB6F57jvZc7p6Hbfng86QURUXYtSSptjkDFWRS6TwqKBkppKA-NwDK3fZP5WvPzpLqbqX9Bf3CWv28plAB82x3Azb0Z_lSwIRsf_cn-GW107pcfov-sONY61mugVUs80GQ38epVZdPR0sl70yxEwl6o9KB-ydq8IsfvbQ1yApWj8vbF_Ul8seOTzX0ka8hdMTQKmCeZ36XbcZ-x6LC2kKAxMRGx-t0bhJ_fETACZ6DtbcDYHOSRtEFTB11USP5Fwzs3Z8BcQ_ttSu4xGNpjMUdqYnXHabu7nS8wsAi4enncZHmhlRJqMG1-kXbxMlpu0U_st5OzBHJlXlIjEI4ELpXB0xuymT9JvJHnjYzM2HG40frZOdb0XqJefYBA1NboSsIn3K-AyfP2G8w9NBt6WiaFn2zlL_SEWTdbyLIyxOaxDBUdUJUGv6KCP6sbsC6w79MpTBroNBGhgqOrexXaXz0gI9rDP2Fq6bYy2gtAVWJ6JQ-EccCkwzIBi15crSGfMG5XLI-fjG2s8wijVKoZ3k5RwOObpkwFjVhN7sD72labbJT_BfxtVXUQPySOqMOAYql-skyYLpKYz_5qyGHFi4uiOH3bj-EY7Asx10OGUZ2FtcAayu8v_PrTl2LQVhaK6uw-SHdYsQVjyT6-gEhy30VKAQG-egAuswGhLJ653T02oyIBvYV6Y5RiIaMKvltrD32jJ2SY4yVuQZbA67BYfMc5jVjQZTOWEUz5iQfYQiqWGFVWorFLTgfr9AJiGURD9bov3PfYfZJKIFD3hZaXzfFICMg2VTK0wMIbBIFEeRGm1xaoRD7gPheJm64hpmv_YVYK_2h9ZrG11sWS6_UBNB2olCUe_FFqgvg9BPY9EZTzTxsNb5i1NsmU_afrCMFkiowNOoLYy74XZlB6qncv7_4G5jN5rYq4RMcKj7KG9CABTxZtNboRh4VOqrKzQUNOJqQAojZ7L9eAbxSnDEXEU8YInD0ZOwFlKIYZAjYT0LZo397KNFh5W9QfK61kVSlpzhYc7ZIi6UnrDLtT8nW_75rpCqai1V5v-6EI2Qint4mWN3OdEaObJvPI9o91p2Fp3KZE4aME33muHyytpbfv3iBW5-2PVusxgemjH3IOBs0aFAFDIZEZ9j2BmUlrZnpwIS-J6HbVvGStidwxfJgbY5ohNY_3O_-NA18yG5yoQP1AkY9TgG5DmdAfRjWW5UmXkKQtgkAyk4lM183ma6jQJOdjCAHFX9TNGe-9rt-MAvDttn23exzpqQcG8CQ1GraCksKA-t-7WYJEyDiQSR0_npc3-O1jSIzICFvlq0Gf_oVJi6_POapXD7-_YMxE-RETaYoXd8R96SzcCEU_TKHKxuxgOUsSQp3PAR945rAa8gCFABAZgHnmLc8uZhOQg7XnJUjXFaGY4m6rQ02TvztlMFkV3aXsv4oIqIr7EEL9tt5Bt8rpPIWkYTuwpXaQjliJmRL2NKauwBxJ_vPPv_7htnc5Zq16_6YXww59_GlrFC5FiAFGQyUzoOcMJAQCm8mvOQ6dQ-Phof0sF4MluEtT1IWkMK9fANSpqRQJxYtiAndnbYcxHld-fslHzcZBwaqRvOcz9nERGk1RRlptcIHdKLmQnwSYzvBCNyyhsvGTDLT2wqBfzc0armKICkQk3lKVllaiB0xm3qjyEc1pO6gzNZPHGZpRqU8lEvwmC0e5WEi4zTRViuNv9cgj4-2ewjrvPHnNS4r7IiZUEqF8DRIg5syyOI1Q-3ybP8s62xKGu7iwfO8LS61Yi38o4bKPOUXJX0gYdOWgF1a41MFDkxfNHzHzWy56QAqaUVnWBSddMwuoqfYMx0aNb3f_53-Y3-VvZCnhH2X2qGmLLpgTOpEA_xBtP4ja-Z_K65opO86t-pNp7F9qyFnOfcp_WnWupPcmci1MsxZY6MvoXEMeOHJTQ_tucCEXMoImwxXeAsfztXmJgEgBfCx8tGblI8V3tfTkQHj29wiaIAyTjylv1TLojD5uhnZcFEi67RUCX45q54HnW0rcfI8f2YNpmEqVWlzyuvBHYGW9i2N4pcArSJUTBolHucBlDT4tnbnmHlAsUh8qixSHPOOv8njofTFpGrPCY1hYpeqKb5Hcw9adwdcrcsfP-FkRROWTrzJX7_9VY8vUiaeTKthcUbZYaf3w4zPVoi0nQ5bmUQEg_KGHtDfr02Nv4_LXzTX9W_ajLDvLANdC-L2wfyrgJ32XPUYD0DDFRzV_mP_v_wFvaqw2bgwAAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19',
        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=f6bfd646-b718-44dc-a378-b73e6b528204&groupId=be8908da-da25-452e-b220-163f52476cdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlfX0%3d',
        id: 'f6bfd646-b718-44dc-a378-b73e6b528204',
        /*pageName: 'ReportSectioneb8c865100f8508cc533',
        visualName: '47eb6c0240defd498d4b',
        permissions: permissions,*/
        /*  settings: {
            filterPaneEnabled: true,
            navContentPaneEnabled: true
          }*/
      };


      let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
      var reportContainer = document.getElementById('container');
      var report = powerbi.embed(reportContainer, config);

      // Report.off removes a given event handler if it exists.
      report.off("loaded");

      // Report.on will add an event handler which prints to Log window.
      report.on("loaded", function () {
        console.log("Loaded");
      });

      // Report.off removes a given event handler if it exists.
      report.off("rendered");

      // Report.on will add an event handler which prints to Log window.
      report.on("rendered", function () {
        console.log("Rendered");
      });

      report.on("error", function (event) {
        console.log(event.detail);
        report.off("error");
      });

      report.off("saved");
      report.on("saved", function (event) {
        console.log(event.detail);
        if (event.detail.saveAs) {
          console.log('In order to interact with the new report, create a new token and load the new report');
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.powerbi-box {
  width: 100%;
  height: calc(100vh - 60px);
}
</style>