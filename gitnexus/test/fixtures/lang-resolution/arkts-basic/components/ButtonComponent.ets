@Component
export struct ButtonComponent {
  private label: string = '';
  private onClick?: () => void;

  build() {
    Button(this.label)
      .onClick(() => {
        if (this.onClick) {
          this.onClick();
        }
      })
  }
}
