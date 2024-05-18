import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useSuspenseQuery } from "@apollo/client";
import { PLACES, placesApli } from "./places";

export default async function Page() {
  const places = await placesApli();

  console.log(places)
  return (
    <main className={styles.main}>
      <header className={styles.header} >
        <Image src='/logo-web-troveed.png' width={140} height={30} alt="Logo Troveed"  />
        <nav>
          <Link href="/" >Lugares</Link>
        </nav>
        <button>Descargar Troveed</button>
      </header>



      <div className={styles.container}>
        {places?.data.places.map((place: any) => (
          <article key={place.id} >
            <Image src={place.images[0]} width={200} height={200} alt={place.name} />
            <h3>{place.name}</h3>
            <p>{place.location.country}</p>
            <div />
          </article>
        ))}
      </div>
    </main>
  );
}
