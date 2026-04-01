interface SignUpTemplateProps {
  name: string;
  url: string;
}

export function SignUpTemplate({ name, url }: SignUpTemplateProps) {
  return (
    <div>
      <h1>
        Welcome, <strong>{name}!</strong>
      </h1>
      <p>
        Click <a href={url}>here</a> to verify your email.
      </p>
    </div>
  );
}

interface ResetPasswordTemplateProps {
  name: string;
  url: string;
}
export function ResetPasswordTemplate({
  name,
  url,
}: ResetPasswordTemplateProps) {
  return (
    <div>
      <h1>
        Welcome, <strong>{name}!</strong>
      </h1>
      <p>
        Click <a href={url}>here</a> to reset you password.
      </p>
    </div>
  );
}
