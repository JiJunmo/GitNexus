import { formatUser } from './utils';
import { ButtonComponent } from './components/ButtonComponent';

interface User {
  id: number;
  name: string;
}

@Entry
@Component
struct EntryComponent {
  @State title: string = 'Hello HarmonyOS';
  @State user: User = { id: 1, name: 'ArkTS' };

  build() {
    Column() {
      Text(this.title)
      ButtonComponent({
        label: 'Click Me',
        onClick: () => {
          this.onButtonClick();
        }
      })
      Text(formatUser(this.user))
    }
  }

  onButtonClick() {
    this.title = 'Clicked!';
  }
}
