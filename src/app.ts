interface Validatable {
  value: string | number;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (validatableInput.minlength && typeof validatableInput.value === 'string') {
    isValid = isValid && false;
  }
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    this.templateElement = document.querySelector('#project-input')! as HTMLTemplateElement;
    this.hostElement = document.querySelector('#app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);

    this.formElement = importedNode.firstElementChild as HTMLFormElement;
    this.formElement.id = 'user-input';

    this.titleInput = this.formElement.querySelector('#title')! as HTMLInputElement;
    this.descriptionInput = this.formElement.querySelector('#description')! as HTMLInputElement;
    this.peopleInput = this.formElement.querySelector('#people')! as HTMLInputElement;

    this.formElement.addEventListener('submit', this.submitHandler.bind(this));

    this.attach();
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    const userIput = this.gatherUserInput();

    if(Array.isArray(userIput)) {
      const [title, description, people] = userIput;

      console.log(title, description, people);
    }
  }

  private gatherUserInput(): [string, string, number] | void {
    const titleValue = this.titleInput.value;
    const descriptionValue = this.descriptionInput.value;
    const peopleValue = this.peopleInput.value;

    if(titleValue.trim().length === 0 || descriptionValue.trim().length === 0 || peopleValue.trim().length === 0) {
      alert('Invalid input, please try again');
    } else {
      return [titleValue, descriptionValue, +peopleValue];
    }
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
  }
}

const projectInput = new ProjectInput();
