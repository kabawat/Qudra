import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
const Wrapper = styled.div`
  * {
    font-family: "Roboto", sans-serif;
  }
  .term_content h2 {
    font-size: 32px;
    font-weight: 700;
    color: #01a789;
  }
  a {
    text-decoration: none;
    color: #01a789;
  }
  .term_content h3 {
    font-size: 28px;
    font-weight: 700;
    color: #505050;
  }
  .term_content h4 {
    font-size: 25px;
    font-weight: 700;
    color: #505050;
  }

  .term_content h5 {
    font-size: 22px;
    font-weight: 700;
    color: black;
    padding-left: 12px;
  }

  .term_content p {
    font-size: 16px;
    font-weight: 400;
    color: #505050;
  }

  .term_content ul {
    list-style: auto;
    padding-bottom: 10px;
  }

  .term_content li {
    padding-bottom: 20px;
  }

  /* ----------- mobile ---------------- */
  @media screen and (min-width: 320px) and (max-width: 768px) {
    .term_content h2 {
      font-size: 25px;
    }
    .term_content h5 {
      font-size: 20px;
      font-weight: 100;
      color: #505050;
      padding-left: 12px;
    }
    .term_content p {
      font-size: 15px;
      font-weight: 400;
      color: #505050;
    }
  }
`;

const TermsAndCondition = () => {
  return (
    <>
      <header className="bg-black home-page-header">
        <div className="container">
          <nav>
            <div className="row">
              <div className="col-lg-3 col-md-4 col-7 ">
                <Link to="/">
                  <img
                    src="./static/images/Logo8.png"
                    alt="logo"
                    style={{ height: "100px" }}
                  />
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <Wrapper>
        <section className="terms_conditions py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="term_content">
                  <p>
                    Quadra provides these terms and conditions. By using our
                    site, you indicate that you accept these terms and
                    conditions, and the referenced policies, and that you agree
                    to abide by them
                  </p>
                  <p>
                    The following Terms of Service, which include the{" "}
                    <a href="#">
                      Privacy Policy, Fee & Changes,Cancellations & Refunds,
                    </a>{" "}
                    and any guideline, policy or content displayed on the
                    Website, are a legally binding contractual agreement between
                    you (“User, “you,” “your”) and QUADRA (hereinafter
                    collectively referred to as the “Terms of Service“). By
                    visiting or using the services available from the domain and
                    sub-domains of quadra.com (the “Website“), you agree to be
                    legally bound by these Terms of Service. We reserve the
                    right to revise these Terms of Service and all linked
                    information from time to time in our sole discretion by
                    updating this posting or any linked information. Unless
                    otherwise provided in such revision, the revised terms will
                    take effect when they are posted.
                  </p>
                  <p>
                    The purpose of these General Conditions is to regulate the
                    conditions and modalities for the use and services of the
                    website, as well as to define the rights and obligations of
                    the users brought together on the website.
                  </p>
                  <p>
                    Any access and / or use of the website and the services
                    offered entails unreserved acceptance and compliance with
                    all the provisions of these General Conditions
                  </p>

                  <div className="heading_text ">
                    <h2>1. OVERVIEW AND DEFINITIONS</h2>
                  </div>
                  <div className="card-body">
                    <p>
                      Quadra is an online marketplace that enables buyers of
                      architectural services (“Clients”) to search for, enter
                      into and manage transactions with providers of
                      architectural services (“Professionals” and, collectively
                      with Clients, “Registered Users”). The Website contains
                      features that enable Professionals and Clients to do,
                      among other things, the following:
                    </p>
                    <p>
                      <b>Customer/Client :</b> means any legal or natural person
                      who uses the Website for purely commercial purposes with
                      the aim of contacting or being brought together with one
                      or more Professionals in order to entrust him with the
                      implementation of an order/project.
                    </p>
                    <p>
                      Professionals : Create profiles, advertise capabilities,
                      submit quotes, negotiate with Employers, obtain project
                      awards, invoice, obtain feedback from Employers, and
                      receive payment from Employers..
                    </p>
                    <p>
                      Professionals :We also provide Registered Users with
                      certain services described in, and subject to, these Terms
                      of Service (as further defined below, the “Services”). We
                      may add, delete or modify some or all of such Services at
                      any time at our sole discretion with reasonable notice
                      posted in advance on the Website. Capitalized terms used
                      in these Terms of Service have the following meanings:
                    </p>
                    <p>
                      <b>Invoicing Mandate : means the invoicing</b> mandate
                      concluded between the Freelancer and the Company by which
                      the Freelancer entrusts the Company, within the limits of
                      the applicable regulations, with the preparation and
                      issuance of his invoices for the orders/projects carried
                      out for a client/client through the Website .
                    </p>
                    <p>
                      “Quadra Billing and Payment Services” means, collectively,
                      the Quadra Invoice Service and the Safe Deposit Service.
                    </p>
                    <p>
                      <b>Order/ Project :</b> refers to the specific task that a
                      customer/client commissions a professional with.
                    </p>
                    <p>
                      <b>Website :</b> means the website with the address{" "}
                      <a href="#">www.quadra.com</a>
                    </p>
                    <p>
                      <b>Services :</b> refers to all the services provided by
                      the Company on the Website, in particular the service of
                      bringing Professionals and Clients/Clients together,
                      providing payment instruments, preparing and issuing
                      invoices on behalf of and on behalf of the professionals,
                      and client/client support services in the search and
                      selection of professionals to carry out orders.
                    </p>
                    <p>
                      <b>Users :</b> refers to the freelancers and
                      customers/clients.
                    </p>
                    <div className="heading_text">
                      <h2>2.REGISTRATION</h2>
                    </div>
                    <div className="heading_text ">
                      <h5>A. Eligibility</h5>
                    </div>

                    <p>
                      To access our Services through our Website, you must be a
                      legal entity, or an individual of eighteen (18) years of
                      age or older who can form legally binding contracts. To
                      become a Registered User, you must accept all of the terms
                      and conditions in, incorporated by reference in, and
                      linked to, these Terms of Service. By becoming a
                      Registered User, you agree to
                    </p>

                    <ol>
                      <li>
                        abide by the Terms of Service and the processes,
                        procedures, and guidelines described throughout the
                        Website.
                      </li>
                      <li>
                        be financially responsible for your use of the Website
                        and the purchase or delivery of services.
                      </li>
                      <li>
                        perform your obligations as specified by any Project
                        Agreement that you accept, unless such obligations are
                        prohibited by law or by the Terms of Service. Quadra
                        reserves the right, in its sole discretion, to refuse,
                        suspend, or terminate Services to anyone.
                      </li>
                    </ol>
                    <div className="heading_text ">
                      <h5>B. Registration</h5>
                    </div>

                    <p>
                      To become a Registered User and to access Services you
                      must register for an Account. You agree to provide true,
                      accurate and complete information as prompted by the
                      registration form and all forms you access on the Website,
                      and to update this information to maintain its
                      truthfulness, accuracy and completeness.
                    </p>

                    <ol>
                      <li>
                        General Once you have registered with the Website as a
                        Registered User, the Website will create your Account
                        with truelancer.com and associate it with an account
                        number.
                      </li>
                      <li>
                        . Username & Password During registration, you will be
                        asked to choose a username and password for the Account.
                        As a Registered User, you agree and you are entirely
                        responsible to safeguard and maintain the
                        confidentiality of the username and password you use to
                        access this Website. You authorize Quadra to assume that
                        any person using the Website with your username and
                        password is you or is authorized to act for you. You
                        agree to notify us immediately if you suspect any
                        unauthorized use of the Account.
                      </li>
                      <li>
                        {" "}
                        Professionals As described on the Website, a
                        Professionals uses proposals to submit quotes for
                        Projects.
                      </li>
                      <li>
                        In order to be included as a professional on the website
                        and to be visible to users, the professionals is also
                        obliged to fill out their profile page correctly and
                        completely and to keep it up to date at all times.
                      </li>
                      <li>
                        Since the Company's website is a local platform, the
                        user is obliged to state the place where he has his
                        registered office or his habitual residence as his main
                        business.
                      </li>
                      <li>
                        {" "}
                        . In order to use the services, the freelancer will
                        issue a billing mandate to the company and upload the
                        necessary documents to the website in order to comply
                        with the obligations related to the fight against
                        undeclared work, as well as to comply with the
                        transparency regulations (KYC - Know Your Customer)
                        required for the purpose combating tax evasion, money
                        laundering and terrorist financing.
                      </li>
                      <li>
                        In the event that the User provides incorrect,
                        inaccurate, outdated or incomplete data, the Company is
                        entitled to block or close his account and deny him
                        future access to all or part of the Services.
                      </li>
                    </ol>
                    <div className="heading_text">
                      <h2>
                        3. Description of the services and functioning of the
                        website
                      </h2>
                    </div>
                    <h5>A. The services include in particular:</h5>
                    <ol>
                      <li>
                        easier bringing together of professionals and
                        customers/clients;
                      </li>
                      <li>
                        Providing payment instruments to secure the processing
                        of an order;
                      </li>
                      <li>
                        the creation and issuance of invoices for the orders
                        carried out in the name and on behalf of the
                        professionals
                      </li>
                      <li>
                        Requesting the documents from the professionals that are
                        required as part of the duty of care and to provide them
                        to customers/clients;
                      </li>
                      <li>
                        The introduction of additional services for
                        customers/clients of medium-sized companies or large
                        companies (so-called "large customers").
                      </li>
                      <li>
                        {" "}
                        .Quadra offers various architectural tasks related to;
                      </li>
                    </ol>
                    <p>
                      Residential Architecture ,Interior Design ,Refurbishment,
                      Cultural Architecture, Commercial & Offices, Hospitality
                      Architecture, Public Architecture, Healthcare
                      Architecture, Educational Architecture, Sports
                      Architecture, Religious Architecture Industrial &
                      Infrastructure, Landscape & Urbanism, Interior design Such
                      as Rendered pictures of exterior and interior, Videos, 3d
                      Panorama, Photo fixing, Interior design, Product design,
                      Presentation
                    </p>
                    <h5>
                      {" "}
                      B. The additional services for customers/clients of major
                      customers include a number of special services that are in
                      particular:
                    </h5>
                    <ol>
                      <li>
                        A search system that makes it possible to offer jobs to
                        verified freelancers.
                      </li>
                      <li>access to reporting</li>
                      <li>
                        A fixed number of options to change/redo/rework the
                        byproduct given to the client/customer in a specified
                        mentioned time before placing the order/project if its
                        agreed by both client and professional
                      </li>
                    </ol>
                    <h5>
                      {" "}
                      C. The customer/client contacts the freelancer by
                      contacting him via the website. After discussing the scope
                      and modalities of the job, the freelancer submits an offer
                      for the job to the customer/client using the tools
                      provided on the website.
                    </h5>
                    <ol>
                      <li>
                        In the event of an agreement, the customer/client pays
                        an amount equal to a portion of the total price of the
                        order to his e-money account referred as milestones.
                        With the receipt of the money, the freelancer begins
                        with the execution of the contract
                      </li>
                      <li>
                        Upon completion of each milestones, an invoice will be
                        prepared and issued by the Company in the name and on
                        behalf of the Professional, based on the information
                        provided by the Professional, and sent by the Company to
                        the client/customer. The Professional is obliged to
                        provide the company with all the information and
                        information that must appear on the invoice in
                        accordance with the legal obligations that apply to him,
                        as provided for by the billing mandate.
                      </li>
                      <li>
                        The Customer has a period of (15) fifteen calendar days
                        from the moment the Company sends a message to the email
                        address of his user account to confirm the order on the
                        Website.
                      </li>
                      <li>
                        The Customer has a period of (15) fifteen calendar days
                        from the moment the Company sends a message to the email
                        address of his user account to confirm the order on the
                        Website.
                      </li>
                      <li>
                        The Client acknowledges that the Company may
                        automatically confirm the Order and release the amounts
                        paid to the Freelancer without any further formalities
                        if the Client has not confirmed the Order within this
                        period and has not expressly expressed his will to
                        refuse to confirm the Order..
                      </li>
                      <li>
                        The Customer has a period of (15) fifteen calendar days
                        from the moment the Company sends a message to the email
                        address of his user account to confirm the order on the
                        Website.
                      </li>
                    </ol>
                    <div className="heading_text">
                      <h2>4. RELATIONSHIPS AND RESPONSIBILITIES</h2>
                    </div>
                    <div className="heading_text ">
                      <h5>A. Client and Professional</h5>
                    </div>
                    <ol>
                      <li>
                        {" "}
                        Project Agreement the engagement, contracting and
                        management of a project are between a Client and a
                        Professional. Upon acceptance of a quote, the Client
                        agrees to purchase, and the Professional agrees to
                        deliver, the services and related deliverables in
                        accordance with the following agreements: (a) the
                        agreement between Employer and Freelancer including the
                        Project Proposal, Project Description, and other terms
                        and conditions as communicated between Employer and
                        Freelancer on the Website or otherwise, (b) these Terms
                        of Service, and (c) any other content uploaded to the
                        Website by either party (collectively, the “Project
                        Agreement”). You agree not to enter into any contractual
                        provisions in conflict with these Terms of Service. Any
                        provision of a Project Agreement in conflict with these
                        Terms of Service is void. Employer is responsible for
                        managing, inspecting, accepting and paying for
                        satisfactory services and deliverables in accordance
                        with the Project Agreement in a timely manner.
                        Freelancer is responsible for the performance and
                        quality of the services in accordance with the Project
                        Agreement in a timely manner. Employer and Freelancer
                        each covenants and agrees to act with good faith and
                        fair dealing in performance of the Project Agreement.
                      </li>
                      <li>
                        {" "}
                        He agrees that all notifications related to the
                        execution of this contract, as well as notifications in
                        accordance with these General Conditions, can be sent to
                        him via the contact e-mail address entered when creating
                        his profile on the website.
                      </li>
                      <li>
                        {" "}
                        The user is solely responsible for all content that he
                        puts online on the website. The company is not obliged
                        to check the content before it is placed online
                      </li>
                      <li>
                        {" "}
                        The user will not publish content that is offensive,
                        defamatory, derogatory, slanderous, racist or
                        xenophobic, contrary to morals and good customs, fake,
                        or contrary to public order or the rights of third
                        parties or the rights could damage the reputation and
                        prestige of the company and, more generally, insofar as
                        it would violate the law and / or regulations, in
                        particular of a criminal nature.
                      </li>
                      <li>
                        {" "}
                        The customer/client is solely responsible for the
                        description of the order/project for which he requests a
                        quote from the Professional. In the event of an error in
                        the description of the order/project, the
                        customer/client is obliged to conclude a corresponding
                        additional order via the website for any additional
                        services and the associated additional costs with the
                        freelancer
                      </li>
                      <li>
                        The customer/client is solely responsible for the
                        description of the order/project for which he requests a
                        quote from the freelancer. In the event of an error in
                        the description of the order/project, the
                        customer/client is obliged to conclude a corresponding
                        additional order via the website for any additional
                        services and the associated additional costs with the
                        freelancer.
                      </li>
                      <li>
                        The User undertakes to access and use the Website and
                        the Services only in accordance with applicable law and
                        these General Conditions.
                      </li>
                      <li>
                        {" "}
                        The User agrees that the Company may take cognizance of
                        any Content published or exchanged on the Website for
                        the sole purpose of verifying the User's compliance with
                        these General Conditions and applicable laws.
                      </li>
                      <li>
                        Likewise, agrees that the Company may intervene to
                        delete or adapt the published content if it violates the
                        laws and regulations in force, as well as the
                        obligations of users pursuant to these General
                        Conditions. There is no obligation on the part of the
                        company to check the published content.
                      </li>
                      <li>
                        Likewise, agrees that the Company may intervene to
                        delete or adapt the published content if it violates the
                        laws and regulations in force, as well as the
                        obligations of users pursuant to these General
                        Conditions. There is no obligation on the part of the
                        company to check the published content.
                      </li>
                    </ol>
                    <h5>
                      B. Independence Client and Professional each acknowledges
                      and agrees that their relationship is that of independent
                      contractors. The Professional shall perform services as an
                      independent contractor and nothing in these Terms of
                      Service shall be deemed to create a partnership, joint
                      venture, agency, or employer-employee relationship between
                      Professional and Client or between Quadra and any Client
                      or Professional .You acknowledge, agree, and understand
                      that Quadra does not, in any way, supervise, direct,
                      control, or evaluate Professionals or their work and is
                      not responsible for any Project, Project terms or Work
                      Product.
                    </h5>
                    <h5>
                      C. Work Product Professional is expected to deliver the
                      Work Product (deliverable or outcome) of the Project
                      Agreement using Quadra to the Client. Quadra can request
                      proof of work performed at any point of time for
                      verification as per Project Agreement.
                    </h5>
                    <h5>D. Company responsibilities</h5>
                    <ol>
                      <li>
                        The Company will do everything necessary to ensure the
                        access and smooth operation of the Website and the
                        Services 24 hours a day, 7 days a week.
                      </li>
                      <li>
                        The Company is not liable for any damage caused by the
                        fact that access to and operation of the website and the
                        services is interrupted due to the failure of
                        third-party systems and facilities - in particular
                        telecommunications providers and service providers - as
                        well as force majeure or malfunctions of the user's
                        devices, unless it is responsible for such damage. The
                        same applies to interruptions due to necessary
                        maintenance work to improve the website and the services
                      </li>
                      <li>
                        The company provides freelancers and customers/clients
                        with tools and technical means that enable them to
                        contact each other via the website to conclude a service
                        or work contract. The Company's responsibility is
                        limited to providing these funds as described herein and
                        bringing the freelancers and clients/clients together
                      </li>
                      <li>
                        Company and User are independent parties, each acting on
                        their own behalf and for their own account.
                      </li>
                      <li>
                        The company does not enter into any contract in the name
                        and/or on behalf of a freelancer or a customer/client.
                        The users conclude a contract with each other directly
                        via the website.
                      </li>
                      <li>
                        6. Consequently, in particular, the company can in no
                        case be considered as an employee / employer or
                        representative of a user
                      </li>
                      <li>
                        Since the Company is in no way involved in the contracts
                        related to an assignment concluded between the
                        Freelancers and the clients/clients, the latter are
                        solely responsible for the generation and resolution of
                        any disputes, claims and disputes that may arise at
                        conclusion and/or performance of said contracts.
                        Consequently, each User releases the Company from any
                        liability in relation to direct or indirect damage,
                        direct or indirect, resulting from the merging,
                        conclusion and/or performance of such a contract between
                        a Professional and a client/client.
                      </li>
                      <li>
                        The Company has no influence on the cancellation of
                        payments or the revocation of a direct debit
                        authorization that is the sole initiative of the
                        customer/principal, nor is it liable for the damage that
                        may result from such cancellation
                      </li>
                      <li>
                        The company makes every effort to ensure the content and
                        validity of the information and documents provided by
                        the freelancers on the website. Nevertheless, the
                        company is not liable for damages resulting from
                        violations by the freelancers of their obligations, in
                        particular in the context of combating undeclared work
                        and compliance with transparency regulations.
                      </li>
                      <li>
                        The Company shall not be held responsible for any false,
                        misleading or out-of-date information communicated to it
                        by the Freelancer.
                      </li>
                      <li>
                        The Company reserves the right not to send
                        communications from clients/clients to freelancers who
                        do not comply with the Website Terms of Use.
                      </li>
                    </ol>

                    <h2>5. Intellectual Property</h2>
                    <h5>A. The Website</h5>
                    <p>
                      The website and each of its components, including but not
                      limited to the texts, images, videos, photos, trademarks,
                      logos, company names and domain names, are the exclusive
                      property of the company or its partners.
                    </p>
                    <p>
                      These elements are protected by intellectual property laws
                      and other laws, in particular copyright.
                    </p>
                    <p>
                      Any reproduction or representation of the website, in
                      whole or in part, or one of its components, without the
                      company's authorization is prohibited and constitutes
                      counterfeiting sanctioned by the Intellectual Property
                      Code.
                    </p>
                    <h5>B. Content</h5>
                    <ol>
                      <li>
                        {" "}
                        Any user who posts content to the Website retains full
                        ownership of anything they post. However, he grants the
                        company a simple, free and transferrable right to use
                        the content.
                      </li>
                      <li>
                        {" "}
                        Marketing and advertising for the Services and the
                        Website or for partnership building purposes. This right
                        of use applies to the entire world and for the entire
                        duration of the user's registration.
                      </li>
                      <li>
                        . Any use of the content published by a user that took
                        place prior to their deactivation, deletion or
                        termination of their account by the company cannot be
                        attacked by the user.
                      </li>
                    </ol>
                    <h2>6. Disputes</h2>
                    <ol>
                      <li>
                        {" "}
                        In the event that the order is canceled by mutual
                        agreement (whether on the initiative of the
                        customer/client or Freelancer), the Company will arrange
                        for the amount of the order to be refunded to the
                        customer/client within 14 days.
                      </li>
                      <li>
                        . In the event of a disagreement between the
                        customer/client and the freelancer about the quality of
                        the services provided, the scope, the modalities or the
                        completion status of the order, they undertake to notify
                        the company through the
                        <b>Customer service</b> and make best efforts to discuss
                        the issues and reach an amicable solution within 45
                        days.
                      </li>
                      <li>
                        The Company may intervene to try to propose a solution
                        to the parties.
                      </li>
                      <li>
                        . If no agreement is reached within this period and the
                        order amount has been paid in advance into an escrow
                        account, the Company will refund within 15 days the
                        amount of the advance payment made by the
                        customer/client equal to the order minus a flat fee of
                        90 euros, which corresponds in particular to the costs
                        incurred by the Company with the providers of payment
                        transaction services and for the handling fees of the
                        dispute.
                      </li>
                      <li>
                        The settlement of disputes is then a personal matter for
                        the customer/client and the freelancer
                      </li>
                    </ol>
                    <h2>7. Payment System</h2>
                    <p>
                      A. Quadra Invoice Service The Quadra Invoice Service
                      enables Professionals to issue invoices and enables
                      Clients to make payments for services
                    </p>
                    <h5>1. General</h5>
                    <p>
                      When a Professional completes a milestone of a Project for
                      an Client, the Professional will complete the electronic
                      invoice form (the “Invoice”) and submit it to the client
                      via the Website. A Freelancer must complete and submit an
                      Invoice to Client for each and every Project. The will
                      provide client with a list of items, including, but not
                      limited to, hours worked, payment required and description
                      of Project(s), to be included on the Invoice (“Invoice
                      Details“). Such Invoice Details will not be final until
                      and unless such Freelancer has confirmed the accuracy of
                      the Invoice Details or waived the right to review the
                      Invoice Details. If a Professional waives his, her or its
                      right to review the Invoice Details, all items in the
                      Invoice Details will be included on the Invoice as
                      received by QUADRA. QUADRA ENCOURAGES ALL FREELANCERS TO
                      REVIEW INVOICE DETAILS. Quadra will submit the Invoice to
                      the Employer and the Employer shall submit the payment
                      specified in the Invoice (“Payment“) to Quadra. When an
                      Employer makes a payment through the Quadra Invoice
                      Service, Quadra deducts the appropriate Service Charges
                      due to Quadra as described on the Website and delivers the
                      remainder of the Payment to the Freelancer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
      <Footer />
    </>
  );
};

export default TermsAndCondition;
