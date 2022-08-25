<template>
  <el-container class="page-404">
    <el-header height="85px">
      <div class="header">
        <img class="logo" src="../../assets/images/logo.gif" alt="" />
        <div class="x-logos">
          <img class="logo-vw" src="../../assets/images/logo-vw.gif" alt="" />
          <img
            class="margin-left20"
            src="../../assets/images/logo-skoda.gif"
            alt=""
          />
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="wrap" style="background-color: white">
        <div class="section" style="height: 199px">
          <div class="error-page-title">
            <div class="error-page-tips">
              <img
                class="margin-right40"
                src="../../assets/images/error-icon.jpg"
                alt=""
              />
              <div>
                抱歉，您没有权限访问该系统，请联系系统管理员。
                <p>
                  Sorry, you do not have permission to access the system, please
                  contact system administrator.
                </p>
              </div>
            </div>
          </div>
          <div class="error-page-link"></div>
        </div>
      </div>
    </el-main>
    <el-footer height="68px">
      <div class="footer">
        <p>上汽大众汽车有限公司 © 2015 SAIC VOLKSWAGEN AUTOMOTIVE CO., LTD.</p>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page-404 {
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  letter-spacing: 0px;
  padding-bottom: 2px;
  ::v-deep .el-header {
    padding: 20px 0;
    .header {
      width: 1170px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      .logo {
        height: fit-content;
      }
      .x-logos {
        font-size: 0;
        .logo-vw {
          margin-top: 4px;
          margin-bottom: -1px;
        }
      }
    }
  }
  ::v-deep .el-main {
    .wrap {
      width: 1170px;
      margin: 0 auto;
      text-align: center;
    }
  }
  .error-page-tips {
    margin: 64px auto;
    font-size: 16px;
    min-height: 68px;
    color: #00b4de;
    display: inline-flex;
    text-align: left;
    width: 60%;
    line-height: 1.5;
    p {
      font-size: 12px;
      color: #ccc;
      font-family: Arial;
      margin-top: 6px;
    }
  }
  ::v-deep .el-footer {
    height: 68px;
    font-size: 14px;
    color: #8d8d8d;
    line-height: 68px;
    text-align: center;
    background-color: #000000;
    p {
      font-family: "Microsoft YaHei", "微软雅黑";
    }
  }
}
</style>
