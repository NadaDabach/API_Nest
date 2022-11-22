import { IsString, IsNumber, IsArray, IsBoolean } from 'class-validator';

export class SchoolDto{
    @IsString()
    libelle: string;
    @IsString()
    sigle: string;
    @IsString()
    type: string;
    @IsString()
    secteur: string;
    @IsString()
    vague: string;
    @IsArray()
    geolocalisation: [number, number];
    @IsString()
    date: string;
    @IsString()
    departement: string;
    @IsString()
    region: string;
    @IsString()
    adresse: string;
    @IsNumber()
    code_postal: number;
    @IsString()
    numero_telephone: string;
    @IsString()
    site_web: string;
    @IsString()
    compte_fb: string;
    @IsString()
    compte_twitter: string;
    @IsString()
    compte_insta: string;
    @IsBoolean()
    favorite: boolean;

    constructor(libelle: string, // ou undefined partout sauf libelle ou autre truc qu'on utilise pour recherche
        sigle: string,
        type: string,
        secteur: string,
        vague: string,
        geolocalisation: [number, number],
        date: string,
        departement: string,
        region: string,
        adresse: string,
        code_postal: number,
        numero_telephone: string,
        site_web: string,
        compte_fb: string,
        compte_twitter: string,
        compte_insta: string,
        favorite: boolean ){

        this.libelle = libelle;
        this.sigle = sigle;
        this.type = type;
        this.secteur = secteur;
        this.vague = vague;
        this.geolocalisation = geolocalisation;
        this.date = date;
        this.departement = departement;
        this.region = region;
        this.adresse = adresse;
        this.code_postal = code_postal;
        this.numero_telephone = numero_telephone;
        this.site_web = site_web;
        this.compte_fb = compte_fb;
        this.compte_twitter = compte_twitter;
        this.compte_insta = compte_insta;
        this.favorite = favorite
    }
}