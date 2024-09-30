// @ts-nocheck
import * as React from "react";
import * as AC from "adaptivecards";
import TextField from "@mui/material/TextField";
import { reactDomRender } from "@/components/cards/components/utils";
import { styled } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  "& .MuiInputBase-root": {
    padding: theme.spacing(0.5, 0),
  },
}));

export class TextInput extends AC.TextInput {
  static readonly JsonTypeName = "Input.Text";

  // For form submission
  private _value: string = "";
  public get value(): string {
    return this._value;
  }
  public isSet(): boolean {
    return this._value ? true : false;
  }
  protected onChange(newValue: string) {
    this._value = newValue;
    this.render();
    return !this.isValid();
  }

  public isValid() {
    const isValid =
      (this.isRequired && (!this.isDirty() || this._value != "")) ||
      !this.isRequired;
    return isValid;
  }

  render(): HTMLElement {
    return reactDomRender(this.renderElement())!;
  }

  private renderElement(): React.ReactElement {
    const sharedProps: object = {
      placeholder: this.placeholder,
      required: this.isRequired,
      error: !this.isValid(),
      helperText: this.errorMessage,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        this.onChange(e.target.value),
    };
    return (
      <StyledTextField
        {...sharedProps}
        fullWidth
        size="small"
        variant="standard"
      />
    );
  }
}
