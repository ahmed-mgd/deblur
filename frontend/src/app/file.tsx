function MyButton({ title }: { title: string }) {
    return (
      <button>{title}</button>
    );
  }
  
  export default function MyApp() {
    return (
      <div>
        <h1>Welcome to my derrière</h1>
        <MyButton title="derrière" />
      </div>
    );
  }
  