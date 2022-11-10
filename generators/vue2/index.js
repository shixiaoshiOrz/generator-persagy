const Generator = require("yeoman-generator");
module.exports = class extends Generator {
  // 构造方法可以处理自定义的命令行参数
  constructor(args, opts) {
    super(args, opts);
    this.projectName = args?.[0] ?? "persagy-app";
    this.cliType = args?.[1] ?? "custom";
  }
  initializing() {
    if (this.cliType === "cli4") {
      this.answers = {
        cli: "cli4",
        eslint: "vue",
        classStyle: false,
        qiankun: true,
      };
    }
    if (this.cliType === "cli5") {
      this.answers = {
        cli: "cli5",
        eslint: "persagy",
        classStyle: false,
        qiankun: true,
      };
    }
  }
  async prompting() {
    if (this.cliType !== "custom") return;
    const cliVersion = [
      {
        type: "list",
        name: "cli",
        message: "请选择vue-cli版本：",
        choices: [
          { name: "vue-cli4.x", value: "cli4" },
          { name: "vue-cli5.x", value: "cli5" },
        ],
        default: "cli5",
      },
    ];
    const cliVersionAnswer = await this.prompt(cliVersion);
    let prompts = [
      {
        type: "confirm",
        name: "classStyle",
        message: "是否使用Class风格编写vue组件？",
        default: false,
      },
      {
        type: "confirm",
        name: "qiankun",
        message: "是否将项目设置为乾坤子应用？",
        default: true,
      },
    ];
    if (cliVersionAnswer.cli === "cli5") {
      prompts.unshift({
        type: "list",
        name: "eslint",
        message: "请选择eslint校验插件：",
        choices: [
          { name: "使用vue-cli默认设置", value: "vue" },
          { name: "使用@persagy/eslint-plugin", value: "persagy" },
        ],
        default: "persagy",
      });
    }
    this.answers = await this.prompt(prompts);
    this.answers.cli = cliVersionAnswer.cli;
    this.answers.projectName = this.projectName;
    if (cliVersionAnswer.cli === "cli4") {
      this.answers.eslint = "vue";
    }
  }
  // 2.生成预定义的项目结构
  async writing() {
    this.destinationRoot(this.projectName);
    this.env.cwd = this.destinationPath();
    // 公共文件
    this.fs.copyTpl(this.templatePath("common"), this.destinationPath(), this.answers);
    this.fs.copyTpl(this.templatePath("base/src/main.ts"), this.destinationPath("src", "main.ts"), this.answers);
    this.fs.copyTpl(this.templatePath(`base/src/utils/${this.answers.qiankun ? "qinakun-router.ts" : "router.ts"}`), this.destinationPath("src", "utils", "router.ts"), this.answers);
    this.fs.copyTpl(this.templatePath("base/.base_eslintrc.js"), this.destinationPath(".eslintrc.js"), this.answers);
    this.fs.copyTpl(this.templatePath("base/vue.config.js"), this.destinationPath("vue.config.js"), this.answers);
    this.fs.copyTpl(this.templatePath("base/base_package.json"), this.destinationPath("package.json"), { projectName: this.projectName, ...this.answers });
    if (this.answers.classStyle) {
      await this.addDependencies({
        "vue-class-component": "^7.2.3",
        "vue-property-decorator": this.answers.cli === "cli4" ? "^8.4.2" : "^9.1.2",
      });
    }
    const devDependencies = require(`../vue2/templates/${this.answers.cli}/package.js`);
    await this.addDevDependencies({
      ...devDependencies,
    });
  }
  // 3.安装依赖
  install() {}

  end() {
    this.log("项目创建成功");
  }
};
